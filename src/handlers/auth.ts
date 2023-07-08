import * as functions from "firebase-functions";
import Database from "../database";

export const handleSignUp = functions.auth.user().onCreate(async (user) => {
  try {
    const getUserName = () => {
      if (!user.displayName) return {};
      const [firstName, lastName] = user.displayName.split(" ");
      return {
        firstName,
        lastName,
      };
    };
    const newUser = await Database.create(
      "users",
      {
        email: user.email,
        createdAt: Date.now(),
        ...getUserName(),
      },
      user.uid
    );
    return newUser;
  } catch (e: any) {
    throw new Error(e.message);
  }
});

export const handleUserDelete = functions.auth.user().onDelete(async (user) => {
  try {
    await Database.delete("users", user.uid);
  } catch (e: any) {
    throw new Error(e.message);
  }
});
