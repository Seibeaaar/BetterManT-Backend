import * as admin from "firebase-admin";
import {Request, Response, NextFunction} from "express";
import {
  CompleteSurveySchema,
  UserCreateSchema,
  UserUpdateSchema,
} from "../schemas/user";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.headers.authorization) {
      const authHeader = req.headers.authorization;
      const idToken = authHeader.split(" ")[1];
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      res.locals = decodedToken.uid as unknown as Record<string, any>;
      next();
    } else {
      res.status(401).send("No token provided");
    }
  } catch (e) {
    res.status(403).send("Invalid token");
  }
};

export const validateUserCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await UserCreateSchema.validate(req.body);
    next();
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

export const validateCompleteSurvey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await CompleteSurveySchema.validate(req.body);
    next();
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

export const validateUserUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await UserUpdateSchema.validate(req.body);
    next();
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};
