import * as jwt from "jsonwebtoken";
import { AuthPayload } from "../models/auth";
import ApiError from "../errors/ApiError";
import ApiResponse from "../models/ServerResponse";

const secret = process.env.JWT_SECRET || "SOME_SECRET";

export function sign(alias: string, email: string) {
  return jwt.sign({
    username: alias,
    email
  }, secret!, { expiresIn: "5h" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, secret) as AuthPayload
  } catch (error) {
    throw ApiError.unauthorized(ApiResponse.badRequest("Invalid token"));
  }
}
