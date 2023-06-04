import { RequestHandler } from "express";
import { ValidationChain } from "express-validator";
import mongoose, { Document, Model } from "mongoose";

declare global {
  type MicroValidator = ({ useForUpdate }: { useForUpdate: boolean }) => Array<ValidationChain[]>;
  type MicroMiddleware = ({ useForUpdate }: { useForUpdate: boolean }) => RequestHandler;
  type CustomValidationChain = ({ isOptional }: { isOptional: boolean }) => ValidationChain[];

  type StringField = ({
    fieldName,
    maxLength,
    isOptional
  }: {
    fieldName: string;
    maxLength: number;
    isOptional: boolean;
  }) => ValidationChain[];

  type StringEnumField = ({
    fieldName,
    enumArray,
    makeUpperCase,
    isOptional
  }: {
    fieldName: string;
    enumArray: string[];
    makeUpperCase: boolean;
    isOptional: boolean;
  }) => ValidationChain[];

  interface IRoleModelCookiePathInjector {
    role: string;
    DbModel: Model<IUser>;
    cookiePath: string;
  }

  interface IDecodedJwtPayload {
    role: string;
    id: string;
    iat: number;
    exp: number;
  }

  interface IPasswordUpdateData {
    oldPassword: string;
    newPassword: string;
  }

  interface ILoginData {
    email: string;
    password: string;
  }

  interface IDbData {
    userId?: string;
    password?: string;
    isDeactivated?: boolean;
  }

  interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    gender: string;
    bio?: string;
    createdAt: Date;
    updatedAt: Date;
    role: string;
  }

  interface IDoctorChamberTimeFrame {
    _id: mongoose.Types.ObjectId;
    startTime: Date;
    endTime: Date;
    patientLimit: number;
  }

  namespace Express {
    interface Locals {
      sortingData: any;
      skipValue: number;
      dataPerPage: number;
      expressValidatorErrorCode: number;
      isExpressValidatorError: boolean;
      validatedReqData: any;
      retrivedDbData: any;
      DbModel;
      doctorChamberUniqueString: string;
      allowedRoleInRoute: string;
      cookiePath: string;
      decodedJwt: IDecodedJwtPayload;
      jwtForSignUp: string;
    }
  }
}
