import { Role } from "@prisma/client";
import express from "express";
import { authFinder } from "../utils/getAuthHeader";
import ApiError from "../errors/ApiError";
import ApiResponse from "../models/ServerResponse";
import { verifyToken } from "../service/auth";
import { prisma } from "../service/prisma";

export function allowRole(role: Role) {
  return async function (
    req: express.Request,
    _res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const token = authFinder(req);
      console.log(token);
      if (!token)
        throw ApiError.unauthorized(ApiResponse.badRequest("Token not found"));
      const decodedToken = verifyToken(token);
      const user = await prisma.user.findFirst({
        where: { alias: decodedToken.username, email: decodedToken.email },
        select: { role: true, pass: false, alias: true, email: true, id: true },
      });
      if (!user)
        throw ApiError.unauthorized(ApiResponse.badRequest("User not found!"));
      if (!user.role.includes(role))
        throw ApiError.unauthorized(ApiResponse.badRequest("Unauthorized"));

      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      console.error("Error getting role", role);
      next(error);
    }
  };
}
