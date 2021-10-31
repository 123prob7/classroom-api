import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";

import { name, secret, sessLifeTime, node_env, cors_opt_url, mongo_connection_url } from "./config/index.js";
import classesRouter from "./components/classes/classes.routes.js";
import authRouter from "./components/auth/auth.routes.js";

const __dirname = path.resolve();
mongoose.connect(mongo_connection_url);

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(
  session({
    name: name,
    secret: secret,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongoUrl: mongo_connection_url,
      collection: "session",
      ttl: sessLifeTime / 1000,
    }),
    cookie: {
      sameSite: true,
      secure: node_env === "production",
      maxAge: sessLifeTime,
    },
  })
);
app.use(cors({ origin: cors_opt_url }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth/", authRouter);
app.use("/api/class/", classesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
