import { Router } from "express";
import { db } from "@workspace/db";
import { activityTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

export const activityRouter = Router();

activityRouter.get("/", async (req, res) => {
  const { entityType, entityId, limit = "50" } = req.query as Record<string, string>;

  let query = db
    .select()
    .from(activityTable)
    .orderBy(desc(activityTable.createdAt))
    .limit(parseInt(limit))
    .$dynamic();

  if (entityType && entityId) {
    query = query.where(
      eq(activityTable.entityType, entityType)
    ) as typeof query;
  } else if (entityType) {
    query = query.where(
      eq(activityTable.entityType, entityType)
    ) as typeof query;
  }

  const activity = await query;
  res.json(activity);
});
