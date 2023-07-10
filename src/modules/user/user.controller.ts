import { Request, Response } from "express";
import User from "./user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserController {
  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
}

export class UserAuthenticatorController {
  private hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }
  private async isValidPassword(password: string, hashPassword: string) {
    return await bcrypt.compare(password, hashPassword);
  }

  public async registerUser(req: Request, res: Response): Promise<any> {
    try {
      if (!req.body) {
        return res.status(500).json({ error: "Server error" });
      }

      let { username, password } = req.body;
      password = this.hashPassword(password);

      const user = new User({ username, password });
      const savedUser = await user.save();
      res.status(201).json(savedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
  public async loginUser(req: Request, res: Response): Promise<any> {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user) return res.sendStatus(404);
      const isValid = await this.isValidPassword(password, user.password);
      if (!isValid) return res.sendStatus(401);

      const accessToken = jwt.sign(
        { username: user.username, _id: user._id },
        process.env.ACCESS_TOKEN_SECRET as string
      );
      res.json({ accessToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
}
