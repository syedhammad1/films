import { IFilm } from "./film.interface";
import mongoose, { Document, Schema } from "mongoose";

interface IFilmDocument extends IFilm, Document {}

const FilmSchema: Schema<IFilmDocument> = new Schema<IFilmDocument>({
  name: String,
  description: String,
  releaseDate: Date,
  ticketPrice: Number,
  country: String,
  genre: String,
  photo: String,
});

const FilmModel = mongoose.model<IFilmDocument>("Film", FilmSchema);

export default FilmModel;
