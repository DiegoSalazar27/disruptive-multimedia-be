import express from "express";
import { prisma } from "../service/prisma";
import { userCreationSchema } from "../models/user";
import { createUser } from "../service/user";
import { allowRole } from "../middleware/roles";
import ApiResponse from "../models/ServerResponse";

const userRouter = express.Router();

userRouter.get("/getCurrentUser", allowRole("R"), async (req, res, next) => {
  try {
    if (!req.user) {
      res.sendStatus(404);
    }

    return res.status(200).send(ApiResponse.success("Success", req.user));
  } catch (error) {
    console.error("Error getting current user", error);
    next(error);
  }
});

userRouter.post("/", async (req, res, next) => {
  try {
    console.log("creating users");
    const data = userCreationSchema.parse(req.body);
    const response = await createUser(data);
    res.json(response);
  } catch (error) {
    console.error("Error creating user", error);
    next(error);
  }
});

userRouter.use("/", allowRole("CRUD"));

userRouter.get("/", async (_req, res, next) => {
  try {
    console.log("Getting users");
    const response = await prisma.user.findMany();
    console.log("INCOMING FROM MONGO", response);
    res.send(ApiResponse.success("Success", response));
  } catch (error) {
    console.error("Error getting users", error);
    next(error);
  }
});

export default userRouter;
