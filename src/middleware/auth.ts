import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({ message: "You are not authorized" });
      }

     
      const token = authHeader.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "Invalid token format" });
      }

      const decoded = jwt.verify(
        token,
        config.secret as string
      ) as JwtPayload & { role: string };

      req.user = decoded;

    
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden access" });
      }

      next();
    } catch (err: any) {
      return res.status(401).json({
        success: false,
        message: err.message || "Unauthorized",
      });
    }
  };
};

export default auth;
