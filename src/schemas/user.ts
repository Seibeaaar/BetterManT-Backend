import * as yup from "yup";
import {buildRegex, nameRegex} from "../utils/regex";
import {
  primaryGoal,
  physicalGoals,
  mentalGoals,
  mentalTraits,
  genders,
} from "../constants/user";

const UserCreatePattern = {
  email: yup
    .string()
    .required("Email required")
    .email()
    .max(32, "Email should not exceed 32 characters"),
  firstName: yup
    .string()
    .required("First name required")
    .matches(nameRegex, "Invalid first name")
    .min(2, "First name at least 2 characters")
    .max(32, "First name should not include more than 32 characters"),
  lastName: yup
    .string()
    .required("Last name required")
    .matches(nameRegex, "Invalid last name")
    .min(2, "Last name at least 2 characters")
    .max(32, "Last name should not include more than 32 characters"),
  primaryGoal: yup
    .string()
    .required("Primary goal required")
    .matches(buildRegex(primaryGoal), "Invalid primary goal"),
  gender: yup.string().required("Gender required").matches(buildRegex(genders)),
  dateOfBirth: yup
    .string()
    .required("DOB required")
    .test((value) => {
      new Date(value).toString() !== "Invalid Date";
    }),
  mentalGoal: yup
    .string()
    .required("Mental goal required")
    .matches(buildRegex(mentalGoals)),
  physicalGoal: yup
    .string()
    .required("Physical goal required")
    .matches(buildRegex(physicalGoals)),
  desiredTraits: yup
    .array()
    .of(yup.string().matches(buildRegex(mentalTraits)))
    .required(),
};

export const UserCreateSchema = yup.object({
  ...UserCreatePattern,
});

export const UserUpdateSchema = yup.object({
  ...UserCreatePattern,
});
