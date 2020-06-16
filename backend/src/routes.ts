import express, { Router } from "express";
import path from "path";
import multer from "multer";

import multerConfig from "./config/multer";

//Controllers
import ItemController from "./controller/ItemController";
import PointController from "./controller/PointController";

const routes = Router();
const upload = multer(multerConfig);

routes.use(
    "/uploads",
    express.static(path.resolve(__dirname, "..", "uploads"))
);

routes.get("/", (_req, res) => {
    res.json("eae");
});

routes.get("/items", ItemController.getItems);

routes.get("/all", PointController.getAllPoints);
routes.get("/points", PointController.getPointFiltered);
routes.get("/points/:id", PointController.getPointById);
routes.post("/points", upload.single("image"), PointController.createPoint);

export default routes;
