import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.middlewares.js";



const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({extended: true, limit :"16mb"}));
app.use(express.static("public"));

app.use(cookieParser());

///// routes import
import userRouter from "./routes/user.routes.js";
import categoryRouter from "./routes/category.routes.js";
import submitAudio from "./routes/submit.routes.js"





//// routes decleration
//user registeration && login
app.use("/api/v1/users", userRouter);
// get categories on home && getCategoryById  && add review
app.use("/api/v1", categoryRouter);
/// submit audio book
app.use("/api/v1/users/audiobooks", submitAudio);




// error handler

app.use(errorHandler);
export {app};