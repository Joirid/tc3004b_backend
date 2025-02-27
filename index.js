// const express = require('express');
import "dotenv/config";
import express from "express";
import indexRoutes from "./routes/index.routes.js";
import itemsRoutes from "./routes/items.routes.js";
import loginRoutes from "./routes/login.routes.js";

const app = express();
app.use(express.json());

app.use(indexRoutes);
app.use(itemsRoutes);
app.use(loginRoutes);

app.listen(5001, console.log("http://localhost:5001"));

 