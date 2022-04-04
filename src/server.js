import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import globalRouter from "./routers/globalRouters.js";
import userRouter from "./routers/usersRouters.js";
import videoRouter from "./routers/videoRouters.js";
import apiRouter from "./routers/apiRouter.js";
import { localsMiddleware } from "./middlewares.js";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

app.use("/api", apiRouter);

export default app;
