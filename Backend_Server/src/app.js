import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";



const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));


// app.use(cors({
//     origin: ["https://deploy-mern-1-whq.vercel.app"],
//     credentials: true
// }));

app.use(express.json());
app.use(express.urlencoded({extended: true, limit :"16mb"}));
app.use(express.static("public"));




// In your Express app setup file


app.use(cookieParser());

///// routes import
import userRouter from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/errorHandler.middlewares.js";




//// routes decleration
//user registeration
app.use("/api/v1/users", userRouter);
//user login
app.use("/api/v1/users", userRouter);
// get categories on home
app.use("/api/v1", userRouter);
/// submit audio book
app.use("/api/v1/users/audiobooks", userRouter);
//// browse audiobook
app.use("api/v1", userRouter);
// for add reviews
app.use('api/v1', userRouter);


// error handler

app.use(errorHandler);
export {app};