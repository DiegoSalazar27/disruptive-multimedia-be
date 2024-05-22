import express from "express";
import { prisma } from "../service/prisma";
import ApiResponse from "../models/ServerResponse";
import { themeCreationSchema } from "../models/theme";

const themeRouter = express.Router();

themeRouter.get("/", async (_req, res, next) => {
  try {
    const themes = await prisma.theme.findMany();
    res.status(200).send(ApiResponse.success("Success", themes));
  } catch (error) {
    console.error("Error getting themes", error);
    next(error);
  }
});

themeRouter.post("/", async (req, res, next) => {
  try {
    const data = themeCreationSchema.parse(req.body);
    const themes = await prisma.theme.create({
      data
    });
    res.status(200).send(ApiResponse.success("Success", themes));
  } catch (error) {
    console.error("Error creating theme", error);
    next(error);
  }
});

themeRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = themeCreationSchema.parse(req.body);
    const themes = await prisma.theme.update({
      where: {
        id
      },
      data
    });
    res.status(200).send(ApiResponse.success("Success", themes));
  } catch (error) {
    console.error("Error updating theme", error);
    next(error);
  }
});

themeRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const themes = await prisma.theme.delete({
      where: {
        id
      },
    });
    res.status(200).send(ApiResponse.success("Success", themes));
  } catch (error) {
    console.error("Error deleteing theme", error);
    next(error);
  }
});

export default themeRouter;
