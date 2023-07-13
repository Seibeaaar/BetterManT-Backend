import * as yup from "yup";
import * as moment from "moment";
import {buildRegex, NAME_REGEX} from "../utils/regex";
import {
  primaryGoal,
  physicalGoals,
  mentalGoals,
  mentalTraits,
  genders,
  heightUnits,
  weightUnits,
  personalityTypes,
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

export const SurveyCompletePattern = {
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
  personality: yup
    .string()
    .required("Provide personality type")
    .matches(buildRegex(personalityTypes), "Invalid personality type"),
};

export const UserCreateSchema = yup.object({
  ...UserCreatePattern,
});

export const CompleteSurveySchema = yup.object({
  ...SurveyCompletePattern,
});

export const MetricSystemPattern = {
  height: yup
    .object({
      value: yup
        .number()
        .min(120, "Minimum height is 120 cm")
        .max(250, "Maximum height is 250 cm"),
      unit: yup
        .string()
        .required()
        .matches(buildRegex(heightUnits), "Invalid height unit"),
    })
    .required(),
  weight: yup
    .object({
      value: yup
        .number()
        .min(30, "Minimum weight is 30 kg")
        .max(250, "Maximum weight is 250 kg"),
      unit: yup
        .string()
        .required()
        .matches(buildRegex(weightUnits), "Invalid weight unit"),
    })
    .required(),
};

export const ImperialSystemPattern = {
  height: yup
    .object({
      value: yup
        .number()
        .min(47, "Minimum height is 47 in")
        .max(99, "Maximum height is 99 in"),
      unit: yup
        .string()
        .required()
        .matches(buildRegex(heightUnits), "Invalid height unit"),
    })
    .required(),
  weight: yup
    .object({
      value: yup
        .number()
        .min(66, "Minimum weight is 66 lbs")
        .max(551, "Maximum weight is 551 lbs"),
      unit: yup
        .string()
        .required()
        .matches(buildRegex(weightUnits), "Invalid weight unit"),
    })
    .required(),
};

export const UserUpdateSchema = yup.object({
  ...UserCreatePattern,
  ...SurveyCompletePattern,
});
