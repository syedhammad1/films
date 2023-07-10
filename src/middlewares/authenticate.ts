import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: any;
}

class AuthenticationMiddleware {
  public authenticateToken(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void {
    const authHeader: string | undefined = req.headers["authorization"];
    const token: string | undefined = authHeader && authHeader.split(" ")[1];
    if (token == null) {
      res.sendStatus(401);
      return;
    }

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
      (err: VerifyErrors | null, user: any) => {
        if (err) {
          res.sendStatus(403);
          return;
        }
        req.user = user;
        next();
      }
    );
  }
}

export default new AuthenticationMiddleware();
