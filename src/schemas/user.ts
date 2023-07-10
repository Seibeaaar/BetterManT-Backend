import * as yup from "yup";
import * as moment from "moment";
import {buildRegex, NAME_REGEX} from "../utils/regex";
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
    .matches(NAME_REGEX, "Invalid first name")
    .min(2, "First name at least 2 characters")
    .max(32, "First name should not include more than 32 characters"),
  lastName: yup
    .string()
    .required("Last name required")
    .matches(NAME_REGEX, "Invalid last name")
    .min(2, "Last name at least 2 characters")
    .max(32, "Last name should not include more than 32 characters"),
};

const SurveyCompletePattern = {
  primaryGoal: yup
    .string()
    .required("Primary goal required")
    .matches(buildRegex(primaryGoal), "Invalid primary goal"),
  gender: yup.string().required("Gender required").matches(buildRegex(genders)),
  dateOfBirth: yup
    .date()
    .required("DOB required")
    .min(moment().subtract(99, "y"))
    .max(moment().subtract(13, "y"), "You must be 13 or older to use the app"),
  mentalGoal: yup
    .array()
    .of(yup.string().matches(buildRegex(mentalGoals)))
    .required()
    .min(2),
  physicalGoal: yup
    .array()
    .of(yup.string().matches(buildRegex(physicalGoals)))
    .required()
    .min(2),
  desiredTraits: yup
    .array()
    .of(yup.string().matches(buildRegex(mentalTraits)))
    .required()
    .min(5),
};

export const UserCreateSchema = yup.object({
  ...UserCreatePattern,
});

export const CompleteSurveySchema = yup.object({
  ...SurveyCompletePattern,
});

export const UserUpdateSchema = yup.object({
  ...UserCreatePattern,
  ...SurveyCompletePattern,
});
