import { Router } from "express";
import { db } from "@workspace/db";
import {
  paymentsTable,
  clientsTable,
  casesTable,
  activityTable,
  insertPaymentSchema,
  updatePaymentSchema,
} from "@workspace/db";
import { eq, and, desc } from "drizzle-orm";

export const paymentsRouter = Router();

const paymentSelect = {
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
};

function mapPayment(p: any) {
  return {
    ...p,
    amount: parseFloat(p.amount ?? "0"),
  };
}

// List payments
paymentsRouter.get("/", async (req, res) => {
  const { caseId, clientId, limit = "100", offset = "0" } = req.query as Record<string, string>;

  const filters: any[] = [];
  if (caseId) filters.push(eq(paymentsTable.caseId, parseInt(caseId)));
  if (clientId) filters.push(eq(paymentsTable.clientId, parseInt(clientId)));

  const query = db
    .select(paymentSelect)
    .from(paymentsTable)
    .leftJoin(clientsTable, eq(paymentsTable.clientId, clientsTable.id))
    .leftJoin(casesTable, eq(paymentsTable.caseId, casesTable.id));

  const payments =
    filters.length > 0
      ? await query
          .where(filters.length === 1 ? filters[0] : and(...filters))
          .orderBy(desc(paymentsTable.date))
          .limit(parseInt(limit))
          .offset(parseInt(offset))
      : await query
          .orderBy(desc(paymentsTable.date))
          .limit(parseInt(limit))
          .offset(parseInt(offset));

  res.json(payments.map(mapPayment));
});

// Create payment
paymentsRouter.post("/", async (req, res) => {
  const body = { ...req.body };
  if (body.amount !== undefined) body.amount = String(body.amount);
  const parsed = insertPaymentSchema.safeParse(body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [payment] = await db
    .insert(paymentsTable)
    .values(parsed.data)
    .returning();

  await db.insert(activityTable).values({
    entityType: "payment",
    entityId: payment.id,
    action: "created",
    details: `Payment ${payment.type} PKR ${parseFloat(payment.amount ?? "0").toLocaleString("en-PK")} recorded`,
  });

  const [full] = await db
    .select(paymentSelect)
    .from(paymentsTable)
    .leftJoin(clientsTable, eq(paymentsTable.clientId, clientsTable.id))
    .leftJoin(casesTable, eq(paymentsTable.caseId, casesTable.id))
    .where(eq(paymentsTable.id, payment.id));

  res.status(201).json(mapPayment(full));
});

// Get payment
paymentsRouter.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const [p] = await db
    .select(paymentSelect)
    .from(paymentsTable)
    .leftJoin(clientsTable, eq(paymentsTable.clientId, clientsTable.id))
    .leftJoin(casesTable, eq(paymentsTable.caseId, casesTable.id))
    .where(eq(paymentsTable.id, id));

  if (!p) {
    res.status(404).json({ error: "Payment not found" });
    return;
  }

  res.json(mapPayment(p));
});

// Update payment
paymentsRouter.patch("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const body = { ...req.body };
  if (body.amount !== undefined) body.amount = String(body.amount);
  const parsed = updatePaymentSchema.safeParse(body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  await db
    .update(paymentsTable)
    .set(parsed.data)
    .where(eq(paymentsTable.id, id));

  const [p] = await db
    .select(paymentSelect)
    .from(paymentsTable)
    .leftJoin(clientsTable, eq(paymentsTable.clientId, clientsTable.id))
    .leftJoin(casesTable, eq(paymentsTable.caseId, casesTable.id))
    .where(eq(paymentsTable.id, id));

  if (!p) {
    res.status(404).json({ error: "Payment not found" });
    return;
  }

  res.json(mapPayment(p));
});

// Delete payment
paymentsRouter.delete("/:id", async (req, res) => {
  await db.delete(paymentsTable).where(eq(paymentsTable.id, parseInt(req.params.id)));
  res.status(204).send();
});
