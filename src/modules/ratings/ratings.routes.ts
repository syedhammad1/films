import { Router } from "express";
import RatingsController from "./ratings.controller";
import authenticate from "../../middlewares/authenticate";
const router: Router = Router();
const ratingsController: RatingsController = new RatingsController();

// POST /ratings/rate
router.post(
  "/rate",
  authenticate.authenticateToken,
  ratingsController.rateFilm.bind(ratingsController)
);

export default router;
