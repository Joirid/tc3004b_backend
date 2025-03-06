// const express = require('express');
import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import indexRoutes from "./routes/index.routes.js";
import itemsRoutes from "./routes/items.routes.js";
import items2Routes from "./routes/items2.routes.js";
import loginRoutes from "./routes/login.routes.js";
import { connectDB } from "./utils/mogodb.js";

const app = express();

connectDB();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(indexRoutes);
app.use(itemsRoutes);
app.use(items2Routes);
app.use(loginRoutes);

app.listen(5001, console.log("http://localhost:5001"));

 