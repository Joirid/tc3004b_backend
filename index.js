// const express = require('express');
import express from "express";
import indexRoutes from "./index.routes.js";

const app = express();

app.use(indexRoutes);

app.listen(6000, console.log("http://localhost:6000"));

 