import { UserCreationData } from "../models/user";
import bcryp from "bcrypt";
import { prisma } from "./prisma";
import ApiError from "../errors/ApiError";
import ApiResponse from "../models/ServerResponse";

export async function createUser(data: UserCreationData) {
  const hashedPass = await bcryp.hash(data.pass, 15);

  const response = await prisma.user.create({
    select: {
      pass: false,
      alias: true,
      email: true,
      id: true,
      role: true,
    },
    data: {
      ...data,
      pass: hashedPass,
    },
  });

  console.log("CREATING USER", response);

  return response;
}

export async function getUserByEmailAndPass(email: string, pass: string) {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user)
    throw ApiError.notFound(ApiResponse.badRequest("Invalid credentials"));

  const hashedPass = await bcryp.compare(pass, user.pass);
  if (!hashedPass)
    throw ApiError.notFound(ApiResponse.badRequest("Invalid credentials"));

  return user;
}
