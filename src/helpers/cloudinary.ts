import axios from 'axios';

export const uploadToCloudinary = async (files: File[]) => {
  const cloudName = 'dluask542';
  const uploadPreset = 'my-school-content';
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

  if (!files || !files.length) return [];

  try {
    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      const response = await axios.post(url, formData);
      const responseData = response.data;

      return {
        id: responseData.public_id,
        url: responseData.secure_url,
        type: file.type,
      };
    });

    const uploadedMedia = await Promise.all(uploadPromises);
    return uploadedMedia;
  } catch (error) {
    console.log(error);
    return [];
  }
};
