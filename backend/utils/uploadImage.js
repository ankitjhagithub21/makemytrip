const cloudinary = require("cloudinary").v2;


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadImage = async (localFilePath) => {
 
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image to Cloudinary
    const response = await cloudinary.uploader.upload(
      localFilePath,
      options
    );
    
    

    return {
      secureUrl: response.secure_url, // Store secure_url for image access
      publicId: response.public_id, // Store public_id for deletion
    };

  } catch (error) {
    console.log(error)
    return null;
  }

};

const deleteImage = async (cloudinaryId) => {
  try {
    if (!cloudinaryId) return;
    await cloudinary.uploader.destroy(cloudinaryId);
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
  }
};

module.exports = {
  uploadImage,
  deleteImage,
};
