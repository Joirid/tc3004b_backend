// const express = require('express');
import 'dotenv/config';
import express from "express";
import indexRoutes from "./routes/index.routes.js";
import itemsRoutes from "./routes/items.routes.js";

const app = express();

app.use(indexRoutes);
app.use(itemsRoutes);

app.listen(5001, console.log("http://localhost:5001"));

 