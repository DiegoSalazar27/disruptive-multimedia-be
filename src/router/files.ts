import express from "express";
import upload from "../service/upload";
import ApiResponse from "../models/ServerResponse";
import ApiError from "../errors/ApiError";

const uploadRouter = express.Router();

uploadRouter.post("/", upload.single("file"), async (req, res, next) => {
  try {
    console.log(req);
    const file = req.file;
    if (!file)
      throw ApiError.badRequest(ApiResponse.badRequest("No file!"));
    
    res.status(200).send(ApiResponse.success("Success"));
  } catch (error) {
    console.error("Error uploading file", error);
    next(error);
  }
});

export default uploadRouter;