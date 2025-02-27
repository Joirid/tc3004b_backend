import { Router } from "express";
import { deleteItem, getItem, getItems, postItem, putItem } from "../controllers/items.controllers.js";

const router = Router();

router.get("/items/", getItems);
router.get("/items/:id", getItem);
router.post("/items/", postItem);
router.put("/items/:id", putItem);
router.delete("/items/:id", deleteItem);

export default router;