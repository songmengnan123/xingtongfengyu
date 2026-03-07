import { S3Storage } from "coze-coding-dev-sdk";

const storage = new S3Storage({
  endpointUrl: process.env.COZE_BUCKET_ENDPOINT_URL,
  accessKey: "",
  secretKey: "",
  bucketName: process.env.COZE_BUCKET_NAME,
  region: "cn-beijing",
});

export { storage };

export async function uploadToStorage(file: File): Promise<{ key: string; url: string }> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const key = await storage.uploadFile({
    fileContent: buffer,
    fileName: `uploads/${Date.now()}_${file.name}`,
    contentType: file.type,
  });

  const url = await storage.generatePresignedUrl({
    key,
    expireTime: 31536000, // 1年
  });

  return { key, url };
}

export async function getStorageUrl(key: string): Promise<string> {
  return await storage.generatePresignedUrl({
    key,
    expireTime: 31536000, // 1年
  });
}
