export interface IFilm {
  name: string;
  description: string;
  releaseDate: Date;
  ticketPrice: number;
  country: string;
  genre: string;
  photo: string;
}

export interface SearchQuery {
  bool: {
    must: any[];
  };
}
