import { Router } from "express";
import { db } from "@workspace/db";
import {
  casesTable,
  clientsTable,
  activityTable,
  insertCaseSchema,
  updateCaseSchema,
} from "@workspace/db";
import { eq, ilike, sql, desc, and } from "drizzle-orm";

export const casesRouter = Router();

const caseSelect = {
  id: casesTable.id,
  clientId: casesTable.clientId,
  clientCode: clientsTable.clientCode,
  clientName: clientsTable.name,
  trademarkNumber: casesTable.trademarkNumber,
  trademarkClass: casesTable.trademarkClass,
  stage: casesTable.stage,
  requiredDate: casesTable.requiredDate,
  description: casesTable.description,
  due: casesTable.due,
  received: casesTable.received,
  total: sql<string>`(${casesTable.due} + ${casesTable.received})`,
  createdAt: casesTable.createdAt,
  updatedAt: casesTable.updatedAt,
};

function mapCase(c: any) {
  return {
    ...c,
    due: parseFloat(c.due ?? "0"),
    received: parseFloat(c.received ?? "0"),
    total: parseFloat(c.total ?? "0"),
  };
}

// List cases
casesRouter.get("/", async (req, res) => {
  const {
    clientId,
    stage,
    search,
    limit = "100",
    offset = "0",
  } = req.query as Record<string, string>;

  const filters: any[] = [];
  if (clientId) filters.push(eq(casesTable.clientId, parseInt(clientId)));
  if (stage) filters.push(eq(casesTable.stage, parseInt(stage)));
  if (search) {
    filters.push(
      ilike(casesTable.trademarkNumber, `%${search}%`)
    );
  }

  const query = db
    .select(caseSelect)
    .from(casesTable)
    .leftJoin(clientsTable, eq(casesTable.clientId, clientsTable.id));

  const cases =
    filters.length > 0
      ? await query
          .where(filters.length === 1 ? filters[0] : and(...filters))
          .orderBy(desc(casesTable.createdAt))
          .limit(parseInt(limit))
          .offset(parseInt(offset))
      : await query
          .orderBy(desc(casesTable.createdAt))
          .limit(parseInt(limit))
          .offset(parseInt(offset));

  res.json(cases.map(mapCase));
});

// Create case
casesRouter.post("/", async (req, res) => {
  const body = { ...req.body };
  if (body.due !== undefined) body.due = String(body.due);
  if (body.received !== undefined) body.received = String(body.received);
  const parsed = insertCaseSchema.safeParse(body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [created] = await db
    .insert(casesTable)
    .values(parsed.data)
    .returning();

  await db.insert(activityTable).values({
    entityType: "case",
    entityId: created.id,
    action: "created",
    details: `Case ${created.trademarkNumber} created at Stage ${created.stage}`,
  });

  const [fullCase] = await db
    .select(caseSelect)
    .from(casesTable)
    .leftJoin(clientsTable, eq(casesTable.clientId, clientsTable.id))
    .where(eq(casesTable.id, created.id));

  res.status(201).json(mapCase(fullCase));
});

// Get case
casesRouter.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const [c] = await db
    .select(caseSelect)
    .from(casesTable)
    .leftJoin(clientsTable, eq(casesTable.clientId, clientsTable.id))
    .where(eq(casesTable.id, id));

  if (!c) {
    res.status(404).json({ error: "Case not found" });
    return;
  }

  res.json(mapCase(c));
});

// Update case
casesRouter.patch("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const body = { ...req.body };
  if (body.due !== undefined) body.due = String(body.due);
  if (body.received !== undefined) body.received = String(body.received);
  const parsed = updateCaseSchema.safeParse(body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  await db
    .update(casesTable)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(casesTable.id, id));

  const [c] = await db
    .select(caseSelect)
    .from(casesTable)
    .leftJoin(clientsTable, eq(casesTable.clientId, clientsTable.id))
    .where(eq(casesTable.id, id));

  if (!c) {
    res.status(404).json({ error: "Case not found" });
    return;
  }

  await db.insert(activityTable).values({
    entityType: "case",
    entityId: id,
    action: "updated",
    details: `Case ${c.trademarkNumber} updated`,
  });

  res.json(mapCase(c));
});

// Delete case
casesRouter.delete("/:id", async (req, res) => {
  await db.delete(casesTable).where(eq(casesTable.id, parseInt(req.params.id)));
  res.status(204).send();
});

// Update stage
casesRouter.patch("/:id/stage", async (req, res) => {
  const id = parseInt(req.params.id);
  const { stage } = req.body as { stage: number };

  if (!stage || stage < 1 || stage > 45) {
    res.status(400).json({ error: "Stage must be between 1 and 45" });
    return;
  }

  await db
    .update(casesTable)
    .set({ stage, updatedAt: new Date() })
    .where(eq(casesTable.id, id));

  const [c] = await db
    .select(caseSelect)
    .from(casesTable)
    .leftJoin(clientsTable, eq(casesTable.clientId, clientsTable.id))
    .where(eq(casesTable.id, id));

  if (!c) {
    res.status(404).json({ error: "Case not found" });
    return;
  }

  await db.insert(activityTable).values({
    entityType: "case",
    entityId: id,
    action: "stage_changed",
    details: `Case ${c.trademarkNumber} moved to Stage ${stage}`,
  });

  res.json(mapCase(c));
});
