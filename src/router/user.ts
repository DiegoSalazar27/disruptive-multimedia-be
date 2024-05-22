import express from "express";
import { prisma } from "../service/prisma";
import { userCreationSchema } from "../models/user";
import { createUser } from "../service/user";
import { allowRole } from "../middleware/roles";
import ApiResponse from "../models/ServerResponse";
import { adminCreationSchema } from "../models/admin";

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
    console.log("creating user");
    const data = userCreationSchema.parse(req.body);
    const response = await createUser(data);

    return res.status(200).send(ApiResponse.success("Success", response));
  } catch (error) {
    console.error("Error creating user", error);
    next(error);
  }
});

userRouter.get("/", allowRole("CRUD"), async (_req, res, next) => {
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

userRouter.post("/createAdmin", allowRole("CRUD"), async (req, res, next) => {
  try {
    console.log("creating admin");
    const data = adminCreationSchema.parse(req.body);
    const response = await createUser({ ...data, role: "CRUD" });

    return res.status(200).send(ApiResponse.success("Success", response));
  } catch (error) {
    console.error("Error creating user", error);
    next(error);
  }
});

userRouter.get("/admin", allowRole("CRUD"), async (_req, res, next) => {
  try {
    console.log("Getting admins");
    const response = await prisma.user.findMany({ where: { role: "CRUD" } });
    console.log("INCOMING FROM MONGO", response);

    res.send(ApiResponse.success("Success", response));
  } catch (error) {
    console.error("Error getting admins", error);
    next(error);
  }
});

userRouter.delete("/admin/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    res.status(200).send(ApiResponse.success("Success", user));
  } catch (error) {
    console.error("Error deleting topic", error);
    next(error);
  }
});

export default userRouter;
