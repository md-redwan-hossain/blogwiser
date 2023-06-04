import { makeFieldOptional } from "../utils/expressValidator.util.macro.js";
import { stringEnumFieldValidator, stringFieldValidator } from "./stringField.validator.macro.js";

export const fullName: CustomValidationChain = ({ isOptional }) => {
  return stringFieldValidator({ fieldName: "fullName", maxLength: 50, isOptional });
};

export const bio: CustomValidationChain = ({ isOptional }) => {
  return stringFieldValidator({ fieldName: "bio", maxLength: 500, isOptional });
};

export const gender: CustomValidationChain = ({ isOptional }) => {
  return stringEnumFieldValidator({
    fieldName: "gender",
    enumArray: ["male", "female", "others"],
    makeUpperCase: false,
    isOptional
  });
};

export const dateOfBirth: CustomValidationChain = ({ isOptional }) => {
  return [
    makeFieldOptional({
      optionalFlag: isOptional,
      field: "dateOfBirth"
    })[0]
      .trim()
      .notEmpty()
      .withMessage("Date can't be empty")
      .bail()
      .isISO8601()
      .withMessage("Invalid date, must be in ISO8601 format")
  ];
};
