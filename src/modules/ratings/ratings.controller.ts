import { Request, Response } from "express";
import Rating from "./ratings.model";

class FilmController {
  public async rateFilm(req: Request | any, res: Response): Promise<void> {
    const { rating, comment, film } = req.body;
    const user = req.user;
    await Rating.create({ rating, comment, film, user: user._id });

    res.json({ message: "Film rated" });
  }
}

export default FilmController;
