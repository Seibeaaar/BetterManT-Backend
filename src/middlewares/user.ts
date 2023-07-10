import * as admin from "firebase-admin";
import {Request, Response, NextFunction} from "express";
import {
  CompleteSurveySchema,
  UserCreateSchema,
  UserUpdateSchema,
  ImperialSystemSchema,
  MetricSystemSchema,
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

export const validateUserMetrics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // We only use height measure to check since if a user selects
    // imperial system - other data will use imperial system too
    const {heightUnit} = req.body;
    const validationSchema =
			heightUnit === "in" ? ImperialSystemSchema : MetricSystemSchema;
    await validationSchema.validate(req.body);
    next();
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};
