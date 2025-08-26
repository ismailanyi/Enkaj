import cloudinary from ".";

interface DeleteImagesResult {
  success: boolean;
  message: string;
  failed?: number;
  succeeded?: number;
  error?: any;
}

export async function deleteCloudinaryImages(
  publicIds: string[]
): Promise<DeleteImagesResult> {
  try {
    if (!publicIds || publicIds.length === 0) {
      return {
        success: false,
        message: "No public IDs provided",
      };
    }

    const idsWithoutExt = publicIds.map((id) => id.split(".")[0]);

    const deletePromises = idsWithoutExt.map((publicId) =>
      cloudinary.uploader.destroy(publicId)
    );

    const results = await Promise.all(deletePromises);
    const failed = results.filter((result) => result.result !== "ok");

    if (failed.length > 0) {
      return {
        success: false,
        message: "Some images failed to delete",
        failed: failed.length,
        succeeded: results.length - failed.length,
      };
    }

    return {
      success: true,
      message: "All images deleted successfully",
      succeeded: results.length,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete images",
      error,
    };
  }
}
