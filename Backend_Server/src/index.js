import dotenv from 'dotenv'
import connectDB from "./db/db.js";
import {app} from "./app.js"
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config({
    path: join(dirname(fileURLToPath(import.meta.url)), '..', '.env')
})

connectDB()
.then( () => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(` server is running at port : ${process.env.PORT}`);
    })
})
.catch( (err) => {
    console.log("Mongodb db connection failed  !! ", err)
})