import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import EventEmitter from "events";
import Film from "../modules/films/film.model";
import User from "../modules/user/user.model";
import Rating from "../modules/ratings/ratings.model";
import { IFilm } from "../modules/films/film.interface";
import { Document, Schema } from "mongoose";

// currently
class Seeders extends EventEmitter {
  constructor() {
    super();
  }

  async seedFilms(count = 10, users: any) {
    try {
      interface IFilmS extends IFilm, Document {
        ratings?: any;
      }
      const films = [];

      for (let i = 0; i < count; i++) {
        const film: IFilmS = new Film({
          name: faker.lorem.words(2),
          description: faker.lorem.paragraph(),
          releaseDate: faker.date.past(),
          ticketPrice: faker.number.int(),
          country: faker.lorem.word(),
          genre: faker.person.gender(),
          photo: faker.image.avatar(),
        });

        const ratings = [];

        for (let j = 0; j < users.length; j++) {
          const rating = new Rating({
            film: film._id,
            user: users[j]._id,
            rating: faker.number.int({ min: 1, max: 5 }),
            comment: faker.lorem.paragraph(),
          });

          await rating.save();
          ratings.push(rating);
        }

        film.ratings = ratings;
        await film.save();
        films.push(film);
        this.emit("progress", { step: "films", progress: (i + 1) / count });
      }

      return films;
    } catch (error) {
      console.error("Error seeding films:", error);
    }
  }

  async seedUsers(count = 20) {
    try {
      const users = [];

      for (let i = 0; i < count; i++) {
        const user = new User({
          username: faker.person.fullName(),
          password:
            "$2b$10$Hd0NsC5jWnNKGWeyiuJl3.OmYgb4eRJvf6t21UFjx73vWdHD2VsX.",
        });

        await user.save();
        this.emit("progress", { step: "users", progress: (i + 1) / count });
        users.push(user);
      }

      return users;
    } catch (error) {
      console.error("Error seeding users:", error);
    }
  }
}
// Usage
const seeder = new Seeders();

mongoose.connect(
  "mongodb+srv://test:test@cluster1.9owx22h.mongodb.net/?retryWrites=true&w=majority"
);

mongoose.connection.once("open", async () => {
  console.log("Connected to MongoDB");
  const userCount = 10;
  const filmCount = 10;
  const totalSteps = userCount + filmCount;
  let completedSteps = 0;

  const handleProgress = (progress: any) => {
    completedSteps++;
    const percentage = Math.round((completedSteps / totalSteps) * 100);
    console.log(`Progress: ${percentage}% - ${progress.step}`);

    if (completedSteps === totalSteps) {
      console.log("Seeding complete");
      mongoose.connection.close();
      return;
    }
  };

  await User.deleteMany();
  await Film.deleteMany();
  await Rating.deleteMany();

  seeder.on("progress", handleProgress);
  seeder.on("error", (error) => {
    console.error(error);
    mongoose.connection.close();
  });

  const users = await seeder.seedUsers(userCount);
  await seeder.seedFilms(filmCount, users);

  handleProgress({ step: "films", progress: 1 });
});

seeder.on("error", (error) => {
  console.error(error);
});
