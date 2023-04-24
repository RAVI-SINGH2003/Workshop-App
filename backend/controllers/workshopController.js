import { Workshop } from "../models/Workshop.js";
import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { getDataUri } from "../utils/dataUri.js";
import cloudinary from "cloudinary";
//create Workshop
export const createWorkshop = catchAsyncError(async (req, res, next) => {
  const { name, type, date, venue, url } = req.body;
  const file = req.file;

  if (!name || !type || !date || !(venue || url)) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }
  let file_public_id = "",
    file_url = "";
  if (file) {
    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
    file_public_id = myCloud.public_id;
    file_url = myCloud.secure_url;
  }
  const workshop = await Workshop.create({
    name,
    type,
    date,
    venue,
    url,
    coverimage: {
      public_id: file_public_id,
      url: file_url,
    },
  });

  return res.status(201).json({
    success: true,
    message: "Workshop created",
    workshop,
  });
});

//Get All Workshops

export const getWorkshops = catchAsyncError(async (req, res, next) => {
  const workshops = await Workshop.find();
  return res.status(200).json({
    success: true,
    workshops,
  });
});

//Get Single Workshop
export const getSingleWorkshop = catchAsyncError(async (req, res, next) => {
  const workshop = await Workshop.findById(req.params.id);
  if (!workshop) {
    return next(new ErrorHandler("Workshop not found!", 404));
  }
  return res.status(200).json({
    success: true,
    workshop,
  });
});

//Update  Workshop
export const updateWorkshop = catchAsyncError(async (req, res, next) => {
  const { name, type, date, venue, url } = req.body;

  const file = req.file;

  if (!name || !type || !date || !(venue || url)) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }
  let workshop = await Workshop.findById(req.params.id);

  if (!workshop) {
    return next(new ErrorHandler("Workshop not found!", 404));
  }

  //Deleting previous cover image
  if (workshop?.coverimage?.public_id) {
    await cloudinary.v2.uploader.destroy(workshop.coverimage.public_id);
  }

  let file_public_id = "",
    file_url = "";
  if (file) {
    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
    file_public_id = myCloud.public_id;
    file_url = myCloud.secure_url;
  }

  workshop.name = name;
  workshop.type = type;
  workshop.date = date;
  workshop.venue = venue;
  workshop.url = url;
  workshop.coverimage = {
    public_id: file_public_id,
    url: file_url,
  };
  await workshop.save();

  return res.status(200).json({
    success: true,
    message: "Workshop updated",
  });
});

//Delete  Workshop
export const deleteWorkshop = catchAsyncError(async (req, res, next) => {
  const workshop = await Workshop.findById(req.params.id);
  if (!workshop) {
    return next(new ErrorHandler("Workshop not found!", 404));
  }
  //Deleting cover image
  if (workshop?.coverimage?.public_id) {
    await cloudinary.v2.uploader.destroy(workshop.coverimage.public_id);
  }
  await workshop.deleteOne();
  return res.status(200).json({
    success: true,
    message : "Workshop deleted",
  });
});
