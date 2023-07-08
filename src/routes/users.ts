import {Router} from "express";
import Database from "../database";
import {verifyToken, validateUserCreate} from "../middlewares/user";

const users = Router();

users.post("/create", verifyToken, validateUserCreate, async (req, res) => {
  try {
    // Since we create user's doc automatically on successful sign up
    // we need to update an existing one rather than create a different document
    const userDoc = {
      ...req.body,
      favorites: {
        exercises: [],
        workouts: [],
        meditations: [],
      },
    };
    const user = await Database.update(
      "users",
			res.locals as unknown as string,
			userDoc
    );
    res.status(201).send(user);
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
});

export default users;
