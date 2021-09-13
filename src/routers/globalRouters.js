import express from "express";
import { getJoin, postJoin, login } from "../controllers/userControllers";
import { home, search } from "../controllers/videoControllers";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.route("/join").get(getJoin).post(postJoin);
globalRouter.get("/login", login);
globalRouter.get("/search", search);

export default globalRouter;
