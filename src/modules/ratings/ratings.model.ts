import { IRating } from "./ratings.interface";
import mongoose, { Document, Schema } from "mongoose";

interface IRatingDocument extends IRating, Document {}

const RatingSchema: Schema<IRatingDocument> = new Schema<IRatingDocument>({
  rating: Number,
  comment: String,
  user: mongoose.Schema.Types.ObjectId,
  film: mongoose.Schema.Types.ObjectId,
});

const RatingModel = mongoose.model<IRatingDocument>("Rating", RatingSchema);

export default RatingModel;
