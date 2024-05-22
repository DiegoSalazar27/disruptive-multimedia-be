import express from "express";
import cors from "cors";
import userRouter from "./router/user";
import topicRouter from "./router/topic";
import categoriesRouter from "./router/categories";
import apiErrorHandler from "./errors/apiErrorHandler";
import { loginCredentialsSchema } from "./models/auth";
import { getUserByEmailAndPass } from "./service/user";
import { sign } from "./service/auth";
import ApiResponse from "./models/ServerResponse";
import { allowRole } from "./middleware/roles";
import uploadRouter from "./router/files";

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.use("/user", userRouter);
app.use("/topic", topicRouter);
app.use("/category", categoriesRouter);
app.use("/login", async (req, res, next) => {
  try {
    console.log("logging in")
    const credentials = loginCredentialsSchema.parse(req.body);
    const user = await getUserByEmailAndPass(
      credentials.email,
      credentials.password
    );
    const token = sign(user.alias, user.email);
    res.status(200).send(ApiResponse.success("Success", { token }));
  } catch (error) {
    console.error("Error login in", error);
    next(error);
  }
});

app.use('/upload', uploadRouter)
app.use(apiErrorHandler);

export default app;
