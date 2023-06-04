import { NextFunction, Request, Response } from "express";
import { Result, ValidationChain, body, matchedData, validationResult } from "express-validator";

export function validationReport(req: Request, res: Response, next: NextFunction): void {
  const errors: Result = validationResult(req);
  if (errors.isEmpty()) {
    res.locals.validatedReqData = matchedData(req);
    next();
  } else {
    res.locals.isExpressValidatorError = true;
    res.locals.expressValidatorErrorCode ??= 400;
    next(errors);
  }
}

export const conditonalValidationChainElem = ({
  condition,
  arrWhenTrue,
  arrWhenFalse
}: {
  condition: boolean;
  arrWhenTrue: Array<ValidationChain[]>;
  arrWhenFalse: Array<ValidationChain[]>;
}): Array<ValidationChain[]> => {
  if (condition) return arrWhenTrue;
  return arrWhenFalse;
};

export const makeFieldOptional = function ({
  optionalFlag,
  field = "",
  location = body
}: {
  optionalFlag: boolean;
  field: string;
  location?;
}): ValidationChain[] {
  if (optionalFlag) return [location(field).optional()];
  return [location(field)];
};
