import { query, ValidationChain } from "express-validator";
import regexPatterns from "../utils/regexPatterns.util.macro.js";

export const sortRule = (): ValidationChain[] => {
  return [
    query("sort")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Sort query field is empty")
      .bail()
      .toLowerCase()
      .not()
      .matches(regexPatterns.excludeCommaSpaceHyphen)
      .withMessage(
        "Sort query param contains illegal characters. Only comma, hyphen, space are allowed"
      )
      .bail()
      .customSanitizer((value) => {
        return value.split(",").join(" ");
      })
  ];
};

export const limitRule = (): ValidationChain[] => {
  return [
    query("limit")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Limit query field is empty.")
      .bail()
      .isInt({ min: 1, max: 100 })
      .bail()
      .withMessage("Must be an integer with the range 1 - 100")
      .not()
      .matches(regexPatterns.excludeSpecialCharacter)
      .withMessage("Limit query param contains illegal special characters.")
  ];
};
export const pageRule = (): ValidationChain[] => {
  return [
    query("page")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Page query field is empty.")
      .bail()
      .isInt({ min: 1 })
      .bail()
      .withMessage("Must be an integer and above 0")
      .not()
      .matches(regexPatterns.excludeSpecialCharacter)
      .withMessage("Limit query param contains illegal special characters.")
  ];
};
