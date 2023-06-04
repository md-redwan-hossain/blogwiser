import { check, ValidationChain } from "express-validator";

export const updateRequestValidator = (): ValidationChain[] => {
  return [
    check("").custom((data) => {
      if (
        data.isVerified ||
        data.isBanned ||
        data.isDeactivated ||
        data.createdAt ||
        data.updatedAt
      ) {
        throw Error("Update Request contains illegal property.");
      } else {
        return true;
      }
    })
  ];
};
