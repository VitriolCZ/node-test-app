import * as express from "express";
import TrackController from "./controllers/track_controller";
import CountController from "./controllers/count_controller";

const router = express.Router();

router.use(express.text());

router.post("/track", (req, res) => new TrackController().process(req, res));
router.get("/count", (req, res) => new CountController().process(req, res));

export { router };