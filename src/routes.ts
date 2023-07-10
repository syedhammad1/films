import { Router } from "express";
import userRoutes from "./modules/user/user.routes";
import filmRoutes from "./modules/films/film.routes";
import ratingRoutes from "./modules/ratings/ratings.routes";

const router: Router = Router();

router.use("/users", userRoutes);
router.use("/ratings", ratingRoutes);
router.use("/films", filmRoutes);

export default router;
