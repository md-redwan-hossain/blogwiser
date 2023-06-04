import { param } from "express-validator";

export const validateMongoIdRouteParam = ({ routeParamName }: { routeParamName: string }) => {
  return [
    param(routeParamName)
      .trim()
      .notEmpty()
      .withMessage(`${routeParamName} can't be empty`)
      .bail()
      .isMongoId()
      .withMessage("Invalid Mongo ID")
  ];
};
