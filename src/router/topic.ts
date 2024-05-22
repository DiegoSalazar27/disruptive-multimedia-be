import express from "express";
import { prisma } from "../service/prisma";
import ApiResponse from "../models/ServerResponse";
import { topicCreationSchema } from "../models/topic";

const topicRouter = express.Router();

topicRouter.get("/", async (_req, res, next) => {
  try {
    const topics = await prisma.topic.findMany();
    res.status(200).send(ApiResponse.success("Success", topics));
  } catch (error) {
    console.error("Error getting topic", error);
    next(error);
  }
});

topicRouter.post("/", async (req, res, next) => {
  try {
    const data = topicCreationSchema.parse(req.body);
    const topics = await prisma.topic.create({
      data,
    });
    res.status(200).send(ApiResponse.success("Success", topics));
  } catch (error) {
    console.error("Error creating topic", error);
    next(error);
  }
});

topicRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = topicCreationSchema.parse(req.body);
    const topics = await prisma.topic.update({
      where: {
        id,
      },
      data,
    });
    res.status(200).send(ApiResponse.success("Success", topics));
  } catch (error) {
    console.error("Error updating topic", error);
    next(error);
  }
});

topicRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const topics = await prisma.topic.delete({
      where: {
        id,
      },
    });
    res.status(200).send(ApiResponse.success("Success", topics));
  } catch (error) {
    console.error("Error deleting topic", error);
    next(error);
  }
});

export default topicRouter;
