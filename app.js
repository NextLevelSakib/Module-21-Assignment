//Import All Package's

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import hpp from 'hpp';
import routes from './routes/api.js';
import {MONGODB_CONNECTION,PORT,MAX_JSON_SIZE,URL_ENCODED,WEB_CACHE,REQUEST_LIMIT_NUMBER,REQUEST_LIMIT_TIME} from "./app/config/config.js";
import fileUpload from 'express-fileupload';



//Instance Of Express JS
const app = express();



//Global Application's Middleware
app.use(cors())
app.use(express.json({limit: MAX_JSON_SIZE}))
app.use(express.urlencoded({ extended: URL_ENCODED }))
app.use(hpp())
app.use(helmet())
app.use(cookieParser())

app.use(fileUpload({
    limits: {fileSize: 50 * 1024 * 1024},
}))




//rateLimiter
const limiter = rateLimit({windowMs: REQUEST_LIMIT_NUMBER, max: REQUEST_LIMIT_TIME})
app.use(limiter)




//Web Caching
app.set('etag', WEB_CACHE);



//MongoDB Connection
mongoose.connect(MONGODB_CONNECTION, {autoIndex:true}).then(()=>{
    console.log("MongoDB Connect SuccessFully")
}).catch(err=>{
    console.log("MongoDB Connect Fail, Something Went Wrong!");
})




//Set Api Route's
app.use('/api', routes)




//Set Application Storage
app.use(express.static('storage'))




//Run The Application
app.listen(PORT, () => {
    console.log(`App is running on port:- ${PORT}`);
})




