import mongoose, { Document, Schema } from "mongoose";
import IUser from "./user.interface";

interface IUserDocument extends IUser, Document {}

const UserSchema: Schema<IUserDocument> = new Schema<IUserDocument>({
  username: String,
  password: String,
});
const UserModel = mongoose.model<IUserDocument>("User", UserSchema);

export default UserModel;
