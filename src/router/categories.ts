import express from "express";
import { prisma } from "../service/prisma";
import { categoryCreationSchema } from "../models/category";
import ApiResponse from "../models/ServerResponse";

const categoriesRouter = express.Router();

categoriesRouter.get("/", async (_req, res, next) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).send(ApiResponse.success("Success", categories));
  } catch (error) {
    console.error("Error getting categories", error);
    next(error);
  }
});

categoriesRouter.post("/", async (req, res, next) => {
  try {
    const data = categoryCreationSchema.parse(req.body);
    const response = await prisma.category.create({
      data
    });
    res.status(200).send(ApiResponse.success("Success", response));
  } catch (error) {
    console.error("Error creating category", error);
    next(error);
  }
});

categoriesRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = categoryCreationSchema.parse(req.body);
    const response = await prisma.category.update({
      where: {
        id
      },
      data
    });
    res.status(200).send(ApiResponse.success("Success", response));
  } catch (error) {
    console.error("Error updating category", error);
    next(error);
  }
});

categoriesRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await prisma.category.delete({
      where: {
        id
      }
    });
    res.status(200).send(ApiResponse.success("Success", response));
  } catch (error) {
    console.error("Error deleting category", error);
    next(error);
  }
});

export default categoriesRouter;
