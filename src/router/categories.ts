import express from "express";
import { prisma } from "../service/prisma";
import { categoryCreationSchema } from "../models/category";
import ApiResponse from "../models/ServerResponse";
import { createContentSchema } from "../models/content";
import ApiError from "../errors/ApiError";
import { allowRole } from "../middleware/roles";

const categoriesRouter = express.Router();

categoriesRouter.get("/", allowRole("R"), async (_req, res, next) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).send(ApiResponse.success("Success", categories));
  } catch (error) {
    console.error("Error getting categories", error);
    next(error);
  }
});

categoriesRouter.put("/:id", allowRole("CRU"), async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = categoryCreationSchema.parse(req.body);
    const response = await prisma.category.update({
      where: {
        id,
      },
      data,
    });
    res.status(200).send(ApiResponse.success("Success", response));
  } catch (error) {
    console.error("Error updating category", error);
    next(error);
  }
});

categoriesRouter.delete("/:id", allowRole("CRUD"), async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await prisma.category.delete({
      where: {
        id,
      },
    });
    res.status(200).send(ApiResponse.success("Success", response));
  } catch (error) {
    console.error("Error deleting category", error);
    next(error);
  }
});

categoriesRouter.get("/:id/content", allowRole("R"), async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await prisma.content.findMany({
      where: {
        categoryId: id,
      },
    });
    res.status(200).send(ApiResponse.success("Success", response));
  } catch (error) {
    console.error("error getiing content", error);
    next(error);
  }
});

categoriesRouter.get(
  "/:id/content/search",
  allowRole("R"),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const name = String(req.query.name);

      if (!name) throw ApiError.badRequest(ApiResponse.badRequest("No name"));

      const response = await prisma.content.findMany({
        where: {
          categoryId: id,
          name: {
            contains: name,
          },
        },
      });
      res.status(200).send(ApiResponse.success("Success", response));
    } catch (error) {
      console.error("error getiing content for category", error);
      next(error);
    }
  }
);

categoriesRouter.post(
  "/:id/content",
  allowRole("CRU"),
  async (req, res, next) => {
    try {
      const user = req.user;
      if (!user)
        throw ApiError.notFound(ApiResponse.badRequest("User not found"));

      const id = req.params.id;
      const data = createContentSchema.parse(req.body);
      const response = await prisma.content.create({
        data: {
          ...data,
          creditsID: user.id,
          categoryId: id,
        },
      });

      res.status(200).send(ApiResponse.success("Success", response));
    } catch (error) {
      console.error("Error creating content", error);
      next(error);
    }
  }
);

export default categoriesRouter;
