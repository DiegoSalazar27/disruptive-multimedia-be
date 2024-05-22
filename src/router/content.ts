import express from "express";
import { createContentSchema } from "../models/content";
import { prisma } from "../service/prisma";
import ApiResponse from "../models/ServerResponse";
import { allowRole } from "../middleware/roles";

const contentRouter = express.Router();

contentRouter.put("/:id", allowRole("CRU"), async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = createContentSchema.parse(req.body);

    const response = await prisma.content.update({
      where: {
        id
      },
      data
    });

    res.status(200).send(ApiResponse.success("Success", response));
  } catch (error) {
    console.error("Error updating content", error);
    next(error);
  }
});


contentRouter.delete("/:id", allowRole("CRUD"), async (req, res, next) => {
  try {
    const id = req.params.id;

    const response = await prisma.content.delete({
      where: {
        id
      }
    });

    res.status(200).send(ApiResponse.success("Success", response));
  } catch (error) {
    console.error("Error deleting content", error);
    next(error);
  }
});

export default contentRouter;
