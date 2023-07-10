import mongoose from "mongoose";
const uri = `mongodb+srv://test:test@cluster1.9owx22h.mongodb.net/?retryWrites=true&w=majority`;

// Single Responsibility pattern it has only one work to do which is connect db
class Database {
  static _connect() {
    mongoose
      .connect(uri)
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.error("Database connection error", err);
      });
  }
}
export const database = Database; // Instantiate the Database class and export the instance
