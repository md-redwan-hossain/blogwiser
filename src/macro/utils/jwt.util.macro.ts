import jsonwebtoken from "jsonwebtoken";
import { jwtSecretInEnv } from "../settings.macro.js";

export function issueJwt({
  jwtPayload,
  jwtExpiration = "3h",
  jwtSecret = jwtSecretInEnv
}: {
  jwtPayload;
  jwtExpiration?: string;
  jwtSecret?: string;
}) {
  return new Promise((resolve, reject) => {
    jsonwebtoken.sign(jwtPayload, jwtSecret, { expiresIn: jwtExpiration }, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });
}

export function verifyJwt(encodedJwt: string, jwtSecret = jwtSecretInEnv) {
  return new Promise((resolve, reject) => {
    jsonwebtoken.verify(encodedJwt, jwtSecret, (err, decodedPayload) => {
      if (err) reject(err);
      else resolve(decodedPayload);
    });
  });
}
