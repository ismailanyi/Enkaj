// REFERENCE: https://github.dev/doubtcrack/Cloudinary-CRUD-Operations

import { Request, Response } from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary";
import { deleteCloudinaryImages } from "../utils/cloudinary/deleteImages";

export class MediaController {
  private storage: CloudinaryStorage;
  upload: multer.Multer;

  constructor() {
    this.storage = new CloudinaryStorage({
      cloudinary: cloudinary,
      /*  params: {
        folder: "properties",
        allowed_formats: ["jpg", "jpeg", "png", "gif"],
        // transformation: [{ width: 1000, height: 1000, crop: "limit" }],
        // format: async (req, file) => 'png', // supports promises as well
        // public_id: (req, file) => 'computed-filename-using-request',
      } as any, */

      params: (req, file) => {
        /* const folderPath = `${folderName.trim()}`; // Update the folder path here
        const fileExtension = path.extname(file.originalname).substring(1);
        const publicId = `${file.fieldname}-${Date.now()}`;
         */

        return {
          folder: req.query.folder ?? "properties",
          allowed_formats: ["jpg", "jpeg", "png", "gif"],
          /*  public_id: publicId,
          format: fileExtension, */
        };
      },
    });

    this.upload = multer({ storage: this.storage });

    // Bind methods
    this.uploadImage = this.uploadImage.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.uploadMultipleImages = this.uploadMultipleImages.bind(this);
  }

  async uploadImage(req: Request, res: Response) {
    try {
      if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }

      /*  const result = await cloudinary.uploader.upload(req.file.path, {
        folder: req.body.folder,
        resource_type: "auto",
      });

      res.json({
        url: result.secure_url,
        publicId: result.public_id,
      }); */

      res.json({
        url: req.file.path, // Cloudinary URL
        publicId: req.file.filename, // Cloudinary public ID
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to upload image" });
    }
  }

  async uploadMultipleImages(req: Request, res: Response) {
    try {
      if (!req.files || req.files.length === 0) {
        res.status(400).json({ error: "No files uploaded" });
        return;
      }

      /* 
      const uploadPromises = (req.files as Express.Multer.File[]).map((file) =>
        cloudinary.uploader.upload(file.path, {
          folder: req.body.folder,
          resource_type: "auto",
        })
      );

       const results = await Promise.all(uploadPromises);

      const uploadedImages = results.map((result) => ({
        url: result.secure_url,
        publicId: result.public_id,
      })); */

      const uploadedImages = (req.files as Express.Multer.File[]).map(
        (file) => ({
          url: file.path,
          publicId: file.filename,
        })
      );

      res.json(uploadedImages);
    } catch (error) {
      res.status(500).json({ error: "Failed to upload images" });
    }
  }

  async deleteImage(req: Request, res: Response) {
    try {
      const { publicId } = req.params;

      if (!publicId) {
        res.status(400).json({ error: "Public ID is required" });
        return;
      }

      const result = await cloudinary.uploader.destroy(publicId);

      if (result.result === "ok") {
        res.json({ message: "Image deleted successfully" });
      } else {
        res.status(400).json({ error: "Failed to delete image" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete image" });
    }
  }

  async deleteMultipleImages(req: Request, res: Response) {
    try {
      // const { publicIds } = req.body;
      const publicIds =
        req.body.publicIds ||
        ((req.query.publicIds || "") as string).split(",");

      /* req.body.publicIds = !Array.isArray(req.body.publicIds)
        ? JSON.parse(String(req.body.publicIds))
        : req.body.publicIds; */

      if (!publicIds || !Array.isArray(publicIds) || publicIds.length === 0) {
        res.status(400).json({ error: "Public IDs array is required" });
        return;
      }

      const result = await deleteCloudinaryImages(publicIds);
      // const result = await deleteCloudinaryImages(req.body.publicIds);

      if (!result.success) {
        res.status(result.failed ? 207 : 500).json(result);
        return;
      }

      res.json(result);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: "Failed to delete images" });
    }
  }
}
