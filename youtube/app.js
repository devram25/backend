import express from "express";
import cors from "cors";
const app = express();
import cookieParser from "cookie-parser";


app.use(cors({ origin: process.env.CORS_ORIGIN, credentials:true}));

// common middlewares
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// Inport Routes
import healthcheckRoute from "./routes/healthcheckRoutes.js";
import userRoute from "./routes/userRoutes.js";




// routes
app.use("/api/v1/healthcheck", healthcheckRoute)
app.use("/api/v1/users", userRoute)



export { app };
