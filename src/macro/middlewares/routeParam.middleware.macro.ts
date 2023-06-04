import { validationReport } from "../utils/expressValidator.util.macro.js";
import { validateMongoIdRouteParam } from "../validators/routeParam.validator.macro.js";

export const mongoIdValidation = ({ routeParamName }: { routeParamName: string }) => {
  return [validateMongoIdRouteParam({ routeParamName }), validationReport];
};
