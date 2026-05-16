import { Router } from "express";
import { db } from "@workspace/db";
import {
  clientsTable,
  casesTable,
  paymentsTable,
  activityTable,
  insertClientSchema,
  updateClientSchema,
} from "@workspace/db";
import { eq, ilike, or, sql, desc } from "drizzle-orm";

export const clientsRouter = Router();

// List clients
clientsRouter.get("/", async (req, res) => {
  const { search, limit = "50", offset = "0" } = req.query as Record<string, string>;

  let query = db.select().from(clientsTable).$dynamic();

  if (search) {
    query = query.where(
      or(
        ilike(clientsTable.name, `%${search}%`),
        ilike(clientsTable.clientCode, `%${search}%`),
        ilike(clientsTable.city, `%${search}%`),
      )
    ) as typeof query;
  }

  const clients = await query
    .orderBy(clientsTable.clientCode)
    .limit(parseInt(limit))
    .offset(parseInt(offset));

  res.json(clients);
});

// Create client
clientsRouter.post("/", async (req, res) => {
  const parsed = insertClientSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [client] = await db
    .insert(clientsTable)
    .values(parsed.data)
    .returning();

  await db.insert(activityTable).values({
    entityType: "client",
    entityId: client.id,
    action: "created",
    details: `Client ${client.clientCode} — ${client.name} created`,
  });

  res.status(201).json(client);
});

// Get client
clientsRouter.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const [client] = await db
    .select()
    .from(clientsTable)
    .where(eq(clientsTable.id, id));

  if (!client) {
    res.status(404).json({ error: "Client not found" });
    return;
  }

  res.json(client);
});

// Update client
clientsRouter.patch("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const parsed = updateClientSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [client] = await db
    .update(clientsTable)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(clientsTable.id, id))
    .returning();

  if (!client) {
    res.status(404).json({ error: "Client not found" });
    return;
  }

  await db.insert(activityTable).values({
    entityType: "client",
    entityId: id,
    action: "updated",
    details: `Client ${client.clientCode} updated`,
  });

  res.json(client);
});

// Delete client
clientsRouter.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await db.delete(clientsTable).where(eq(clientsTable.id, id));
  res.status(204).send();
});

// List client cases
clientsRouter.get("/:id/cases", async (req, res) => {
  const id = parseInt(req.params.id);

  const cases = await db
    .select({
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
    })
    .from(casesTable)
    .leftJoin(clientsTable, eq(casesTable.clientId, clientsTable.id))
    .where(eq(casesTable.clientId, id))
    .orderBy(desc(casesTable.createdAt));

  res.json(
    cases.map((c) => ({
      ...c,
      due: parseFloat(c.due ?? "0"),
      received: parseFloat(c.received ?? "0"),
      total: parseFloat(c.total ?? "0"),
    }))
  );
});

// Get client ledger
clientsRouter.get("/:id/ledger", async (req, res) => {
  const id = parseInt(req.params.id);

  const [client] = await db
    .select()
    .from(clientsTable)
    .where(eq(clientsTable.id, id));

  if (!client) {
    res.status(404).json({ error: "Client not found" });
    return;
  }

  const cases = await db
    .select({
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
    })
    .from(casesTable)
    .leftJoin(clientsTable, eq(casesTable.clientId, clientsTable.id))
    .where(eq(casesTable.clientId, id))
    .orderBy(desc(casesTable.createdAt));

  const payments = await db
    .select({
      id: paymentsTable.id,
      clientId: paymentsTable.clientId,
      caseId: paymentsTable.caseId,
      trademarkNumber: casesTable.trademarkNumber,
      clientName: clientsTable.name,
      type: paymentsTable.type,
      amount: paymentsTable.amount,
      date: paymentsTable.date,
      notes: paymentsTable.notes,
      createdAt: paymentsTable.createdAt,
    })
    .from(paymentsTable)
    .leftJoin(clientsTable, eq(paymentsTable.clientId, clientsTable.id))
    .leftJoin(casesTable, eq(paymentsTable.caseId, casesTable.id))
    .where(eq(paymentsTable.clientId, id))
    .orderBy(desc(paymentsTable.date));

  const mappedCases = cases.map((c) => ({
    ...c,
    due: parseFloat(c.due ?? "0"),
    received: parseFloat(c.received ?? "0"),
    total: parseFloat(c.total ?? "0"),
  }));

  const mappedPayments = payments.map((p) => ({
    ...p,
    amount: parseFloat(p.amount ?? "0"),
  }));

  const totalDue = mappedCases.reduce((sum, c) => sum + c.due, 0);
  const totalReceived = mappedCases.reduce((sum, c) => sum + c.received, 0);
  const balance = totalReceived - totalDue;

  res.json({
    client,
    cases: mappedCases,
    payments: mappedPayments,
    totalDue,
    totalReceived,
    balance,
  });
});
