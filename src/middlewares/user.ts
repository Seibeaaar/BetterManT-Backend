import * as admin from "firebase-admin";
import * as yup from "yup";
import {Request, Response, NextFunction} from "express";
import {
  UserCreateSchema,
  UserUpdateSchema,
  SurveyCompletePattern,
  MetricSystemPattern,
  ImperialSystemPattern,
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
    const {
      height: {unit},
    } = req.body;
    const MetricsSchema =
			unit === "in" ? ImperialSystemPattern : MetricSystemPattern;
    const surveySchema = yup.object({
      ...SurveyCompletePattern,
      ...MetricsSchema,
    });
    await surveySchema.validate(req.body);
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
