import { app } from "./app.js";
import { connectDB } from "./config/db.js";
import cloudinary from "cloudinary";

connectDB();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

app.listen(process.env.PORT || 5000,()=>{
    console.log(`Server is running on PORT ${process.env.PORT ||5000}`);
})