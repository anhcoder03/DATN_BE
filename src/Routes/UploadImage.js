import { Router } from "express";
import { uploadCloud } from "../Middlewares/UploadImage.js";
import {
  deleteImage,
  updateImage,
  uploadImage,
} from '../Controllers/UploadImage.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
const router = Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  allowedFormats: ['jpg', 'png'],
  params: {
    folder: 'mediaPro-DATN',
  },
});
const upload = multer({ storage: storage });
router.post('/images/upload', upload.array('image', 10), uploadImage);
router.delete('/images/:publicId', deleteImage);
router.put('/images/:publicId', uploadCloud.array('image', 10), updateImage);
export default router;
