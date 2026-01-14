import { Response } from "express";
import { CustomRequest } from "../types/custom";
import { STATUS_CODE } from "../constants/statusCode";
import { IBucketService } from "../types/Interfaces/IBucketService";
import path from "path";

export class BucketController {
  constructor(private bucketService: IBucketService) {}

  async getFileInBucketByObjectName(
    req: CustomRequest<unknown>,
    res: Response,
  ) {
    const { objectName } = req.params;
    const filePath = path.join(__dirname, "..", "..", "uploads", objectName);
    return res.sendFile(filePath);
  }

  async getFileByObjectName(req: CustomRequest<unknown>, res: Response) {
    const { objectName } = req.params;
    const response = await this.bucketService.renewPresignedUrl(objectName);
    return res.status(STATUS_CODE.OK).json({ url: response });
  }

  async uploadFile(req: CustomRequest<unknown>, res: Response) {
    const file = req.file;

    // fallback defensivo
    if (!file && req.body?.file) {
      return res.status(400).json({
        message: "Arquivo veio como JSON. Envie binário no multipart.",
      });
    }

    if (!file) {
      console.log("headers:", req.headers["content-type"]);
      console.log("body:", req.body);
      return res.status(400).json({ message: "No file uploaded" });
    }

    const response = await this.bucketService.uploadFile(
      process.env.MINIO_BUCKET as string,
      file,
    );

    return res.status(200).json(response);
  }
}
