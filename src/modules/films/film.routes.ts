import { Router } from "express";
import FilmController from "./film.controller";

const router: Router = Router();
const filmController: FilmController = new FilmController();

// GET /films
router.get("/", filmController.getAllFilms.bind(filmController));

// POST /films
router.post("/", filmController.createFilm.bind(filmController));

// POST /films/search
router.get("/search", filmController.searchFilm.bind(filmController));

export default router;
