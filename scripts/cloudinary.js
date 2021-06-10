import _cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config({
  path: '../.env',
});

const cloudinary = _cloudinary.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export { cloudinary };
