import express from "express";
const router = express.Router();
import {singleUpload} from "../middlewares/multer.js";
import {
  createWorkshop,
  getWorkshops,
  getSingleWorkshop,
  updateWorkshop,
  deleteWorkshop,
} from "../controllers/workshopController.js";

router.route("/create").post(singleUpload,createWorkshop);
router.route("/all").get(getWorkshops);
router.route("/:id").get(getSingleWorkshop).put(singleUpload,updateWorkshop).delete(deleteWorkshop);

export default router;