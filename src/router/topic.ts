import express from "express";
import { prisma } from "../service/prisma";
import ApiResponse from "../models/ServerResponse";
import { topicCreationSchema } from "../models/topic";
import { allowRole } from "../middleware/roles";
import { categoryCreationSchema } from "../models/category";

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

topicRouter.get("/:id", async (_req, res, next) => {
  try {
    const topics = await prisma.topic.findUnique({
      where: { id: _req.params.id },
    });
    res.status(200).send(ApiResponse.success("Success", topics));
  } catch (error) {
    console.error("Error getting topic", error);
    next(error);
  }
});

topicRouter.use(allowRole("CRUD"));

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

topicRouter.get("/search", async (req, res, next) => {
  try {
    const search = req.query.q;
    if (!search) {
      res.status(200).send(ApiResponse.success("Success", {}));
      return;
    }

    const strSeach = String(search);
    const response = prisma.topic.findMany({
      where: {
        name: {
          contains: strSeach
        }
      }
    });

    res.status(200).send(ApiResponse.success("Success", response));
  } catch (error) {
    console.error("Error seaching topic", error);
    next(error);
  }
});

topicRouter.get("/:id/categories", async (req, res, next) => {
  try {
    const id = req.params.id;
    const categories = await prisma.category.findMany({
      where: {
        topicsID: id
      }
    });
    res.status(200).send(ApiResponse.success("Success", categories));
  } catch (error) {
    console.error("Error getting categories", error);
    next(error)
  }
});

topicRouter.post("/:id/categories", allowRole("CRU"), async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = categoryCreationSchema.parse(req.body);
    const response = await prisma.category.create({
      data: {
        ...data,
        topicsID: id
      }
    });
    res.status(200).send(ApiResponse.success("Success", response));
  } catch (error) {
    console.error("Error creating category", error);
    next(error);
  }
});


export default topicRouter;
