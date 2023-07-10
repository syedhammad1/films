import { Request, Response } from "express";
import Film from "./film.model";
import EClient from "../../libs/elasticSearch";
import { IFilm, SearchQuery } from "./film.interface";

class FilmController {
  private elasticClient = EClient.getClient();
  public async getAllFilms(req: Request, res: Response): Promise<void> {
    try {
      const films = await Film.find();
      res.json({ data: films });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }

  public async createFilm(req: Request, res: Response): Promise<void> {
    try {
      const payload: IFilm = req.body;
      const film = new Film(payload);
      await film.save();
      await this.elasticClient.index({
        index: "films",
        body: payload,
      });
      res.json({ message: "Film created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }

  public async searchFilm(req: Request, res: Response): Promise<void> {
    const { query, genre, country } = req.query;
    const searchQuery: SearchQuery = {
      bool: {
        must: [],
      },
    };

    if (query) {
      searchQuery.bool.must.push({ match: { _all: query } });
    }

    if (genre) {
      searchQuery.bool.must.push({ match: { genre } });
    }

    if (country) {
      searchQuery.bool.must.push({ match: { country } });
    }

    const eResponse = await this.elasticClient.search({
      index: "films",
      body: { query: searchQuery },
    });

    res.json(eResponse.body.hits.hits.map((hit: any) => hit._source));
  }
}

export default FilmController;
