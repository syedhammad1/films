import mongoose from "mongoose";

export interface IRating {
  rating: Number;
  comment: string;
  film: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
}

export interface SearchQuery {
  bool: {
    must: any[];
  };
}
