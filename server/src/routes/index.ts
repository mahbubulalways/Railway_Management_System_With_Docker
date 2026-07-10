import { Router } from "express";
import permissionRoutes from "../app/modules/permission/permission.route";
import userRoutes from "../app/modules/user/user.route";
import adminRoutes from "../app/modules/admin/admin.route";
import authRoutes from "../app/modules/auth/auth.route";
import stationRoutes from "../app/modules/station/station.routes";
import staffRoutes from "../app/modules/staff/staff.route";
import staffTypesRoutes from "../app/modules/staff-types/staff-types.route";
import coachModelRoutes from "../app/modules/coach-model/coach-model.route";
import coachRoutes from "../app/modules/coach/coach.route";
import routeRoutes from "../app/modules/route/route.route";
import trainRoutes from "../app/modules/train/train.route";

type TApplicationRoutes = {
  route: Router;
  path: string;
};
const router = Router();

const applicationRoutes: TApplicationRoutes[] = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/admin",
    route: adminRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/station",
    route: stationRoutes,
  },
  {
    path: "/permission",
    route: permissionRoutes,
  },
  {
    path: "/staff",
    route: staffRoutes,
  },
  {
    path: "/staff-type",
    route: staffTypesRoutes,
  },
  {
    path: "/coach-model",
    route: coachModelRoutes,
  },
  {
    path: "/coach",
    route: coachRoutes,
  },
  {
    path: "/route",
    route: routeRoutes,
  },
  {
    path: "/train",
    route: trainRoutes,
  },
];
applicationRoutes.forEach((element) => router.use(element.path, element.route));

export default router;
