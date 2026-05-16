import { Router, type IRouter } from "express";
import healthRouter from "./health";
import { clientsRouter } from "./clients";
import { casesRouter } from "./cases";
import { paymentsRouter } from "./payments";
import { activityRouter } from "./activity";
import { dashboardRouter } from "./dashboard";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/clients", clientsRouter);
router.use("/cases", casesRouter);
router.use("/payments", paymentsRouter);
router.use("/activity", activityRouter);
router.use("/dashboard", dashboardRouter);

export default router;
