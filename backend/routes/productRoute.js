import express from "express";
import exportAllProducts from "../controllers/porductController.js";

const router = express.Router()

router.route("/products").get(exportAllProducts)

export default router