import cloudinary from "../Configs/cloudinary.js";

//UPLOAD IMAGE
export const uploadImage = async (req, res) => {
  const files = req.files;

  if (!Array.isArray(files)) {
    return res.status(400).json({
      message: "No files were uploaded!",
    });
  }
  try {
    const uploadPromises = files.map((file) => {
      // Sử dụng Cloudinary API để upload file lên Cloudinary
      return cloudinary.uploader.upload(file.path);
    });

    // Chờ cho tất cả các file đều được upload lên Cloudinary
    const results = await Promise.all(uploadPromises);

    if (!results) {
      throw new Error(
        "The image has not been loaded yet. Please wait a The image has not been loaded yet. Please wait a few seconds..."
      );
    }

    // Trả về kết quả là một mảng các đối tượng chứa thông tin của các file đã upload lên Cloudinary
    const uploadedFiles = results.map((result) => ({
      url: result.secure_url,
      publicId: result.public_id,
    }));

    return res.json({
      message: "Images uploaded successfully!",
      image_urls: uploadedFiles,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//DELETE IMAGE
export const deleteImage = async (req, res) => {
  const { publicId } = req.params;
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return res.status(200).json({
      message: "Image deleted successfully!",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateImage = async (req, res) => {
  const files = req.files;

  if (!Array.isArray(files)) {
    return res.status(400).json({
      message: "No files were uploaded!",
    });
  }

  const publicId = req.params.publicId; // lấy publicId của ảnh cũ cần cập nhật
  const newImage = req.files[0].path; // lấy path của ảnh mới

  try {
    // Upload ảnh mới lên Cloudinary và xóa ảnh cũ cùng lúc
    const [uploadResult, deleteResult] = await Promise.all([
      cloudinary.uploader.upload(newImage),
      cloudinary.uploader.destroy(publicId),
    ]);

    // Trả về kết quả với url và publicId của ảnh mới
    return res.status(400).json({
      message: "Images updated successfully!",
      image_url: {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
