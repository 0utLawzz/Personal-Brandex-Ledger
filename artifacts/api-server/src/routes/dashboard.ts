import { Router } from "express";
import { db } from "@workspace/db";
import { clientsTable, casesTable, paymentsTable, activityTable } from "@workspace/db";
import { sql, desc } from "drizzle-orm";

export const dashboardRouter = Router();

dashboardRouter.get("/summary", async (_req, res) => {
  const [clientCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(clientsTable);

  const [caseCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(casesTable);

  const [financials] = await db
    .select({
      totalDue: sql<string>`coalesce(sum(due), 0)`,
      totalReceived: sql<string>`coalesce(sum(received), 0)`,
    })
    .from(casesTable);

  const casesByStage = await db
    .select({
      stage: casesTable.stage,
      count: sql<number>`count(*)::int`,
    })
    .from(casesTable)
    .groupBy(casesTable.stage)
    .orderBy(casesTable.stage);

  const recentActivity = await db
    .select()
    .from(activityTable)
    .orderBy(desc(activityTable.createdAt))
    .limit(20);

  const totalDue = parseFloat(financials?.totalDue ?? "0");
  const totalReceived = parseFloat(financials?.totalReceived ?? "0");

  res.json({
    totalClients: clientCount?.count ?? 0,
    totalCases: caseCount?.count ?? 0,
    totalDue,
    totalReceived,
    balance: totalReceived - totalDue,
    casesByStage,
    recentActivity,
  });
});
