import express from "express";
import upload from "../service/upload";
import ApiResponse from "../models/ServerResponse";
import ApiError from "../errors/ApiError";
import { PORT } from "../app";

const uploadRouter = express.Router();

uploadRouter.post("/", upload.single("file"), async (req, res, next) => {
  try {
    console.log("Uplaoded file");
    const file = req.file;
    if (!file)
      throw ApiError.badRequest(ApiResponse.badRequest("No file!"));

    console.log(file);
    const fileDestination = `http://localhost:${PORT}/uploads/${file.filename}`
    res.status(200).send(ApiResponse.success("Success", { url: fileDestination }));
  } catch (error) {
    console.error("Error uploading file", error);
    next(error);
  }
});

export default uploadRouter;

