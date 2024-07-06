import axios from "axios";
import { ImagePickerAsset } from "expo-image-picker";
const CLOUD_NAME = "dry4uas1f";
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
const PRESET = "ylz3qbi1";
const FOLDER = "bksafe";
export const uploadImg = async (img: ImagePickerAsset) => {
  // Initial FormData
  // const formData = new FormData();
  // const base64Img = `data:image/jpg;base64,${img.base64}`;
  // formData.append("file", base64Img);
  // formData.append("upload_preset", PRESET);
  // formData.append("folder", FOLDER);
  const formData = {
    file: `data:image/jpg;base64,${img.base64}`,
    upload_preset: PRESET,
    folder: FOLDER,
  };
  return axios
    .post<{ secure_url: string }>(UPLOAD_URL, formData)
    .then((response) => {
      const data = response.data;
      const fileURL = data.secure_url;
      return fileURL;
    });
};
