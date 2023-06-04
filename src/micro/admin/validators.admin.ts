import { conditonalValidationChainElem } from "../../macro/utils/expressValidator.util.macro.js";
import {
  validateChangePassword,
  validateSignUpCredentials
} from "../../macro/validators/auth.validator.macro.js";
import * as macroPersonalDataValidators from "../../macro/validators/personalData.validator.macro.js";

export const adminDataValidator: MicroValidator = ({ useForUpdate }) => {
  return [
    ...conditonalValidationChainElem({
      condition: useForUpdate,
      arrWhenTrue: [validateChangePassword({ isOptional: true })],
      arrWhenFalse: [validateSignUpCredentials()]
    }),
    macroPersonalDataValidators.fullName({ isOptional: useForUpdate }),
    macroPersonalDataValidators.dateOfBirth({ isOptional: useForUpdate }),
    macroPersonalDataValidators.gender({ isOptional: useForUpdate }),
    macroPersonalDataValidators.bio({ isOptional: useForUpdate })
  ];
};
