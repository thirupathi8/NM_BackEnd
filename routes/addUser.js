import express from "express";
import handleAddUser from "../controllers/addUser.js";

const router = express.Router();

router.post("/add-user", handleAddUser);

export default router;