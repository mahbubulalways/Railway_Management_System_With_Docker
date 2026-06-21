import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const generateToken = async <T>(
  payload: Record<string, unknown>,
  secret: Secret,
  expiresIn: T,
) => {
  return jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: expiresIn as number,
  });
};

const verifyToken = async (token: string, secret: string) => {
  try {
    const data = jwt.verify(token, secret as string) as JwtPayload;
    return data;
  } catch (error) {
    return null;
  }
};
export const jwtHelper = {
  generateToken,
  verifyToken,
};
