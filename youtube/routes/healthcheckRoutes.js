import { Router } from "express";
import { healthcheck } from "../controllers/healthcheckController.js";

const  healthcheckRoute = Router()

healthcheckRoute.route("/").get(healthcheck)

export default healthcheckRoute