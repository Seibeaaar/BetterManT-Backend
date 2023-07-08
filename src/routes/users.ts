import {Router} from "express";
import Database from "../database";
import {verifyToken, validateUserCreate} from "../middlewares/user";

const users = Router();

users.post("/create", verifyToken, validateUserCreate, async (req, res) => {
  try {
    const userId = res.locals as unknown as string;
    const userDoc = {
      ...req.body,
      surveyCompleted: false,
      createdAt: Date.now(),
    };
    const user = await Database.create("users", userDoc, userId);
    res.status(201).send(user);
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
});

export default users;
