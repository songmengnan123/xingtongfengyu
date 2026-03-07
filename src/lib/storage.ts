import { S3Storage } from "coze-coding-dev-sdk";

const endpointUrl = process.env.COZE_BUCKET_ENDPOINT_URL || "https://s3.coze-coding.com";
const bucketName = process.env.COZE_BUCKET_NAME || "xingtongfengyu";

console.log('Storage init:', { endpointUrl, bucketName, hasEnv: !!process.env.COZE_BUCKET_ENDPOINT_URL });

const storage = new S3Storage({
  endpointUrl,
  accessKey: "",
  secretKey: "",
  bucketName,
  region: "cn-beijing",
});

export { storage };

export async function uploadToStorage(file: File): Promise<{ key: string; url: string }> {
  try {
    console.log('Starting upload:', { fileName: file.name, size: file.size, type: file.type });
    
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log('Buffer created:', { size: buffer.length });
    console.log('Uploading to S3...');

    const key = await storage.uploadFile({
      fileContent: buffer,
      fileName: `uploads/${Date.now()}_${file.name}`,
      contentType: file.type,
    });

    console.log('Upload success:', { key });

    const url = await storage.generatePresignedUrl({
      key,
      expireTime: 31536000, // 1年
    });

    console.log('URL generated:', { url: url.substring(0, 100) + '...' });

    return { key, url };
  } catch (error) {
    console.error('Upload error details:', error);
    throw error;
  }
}

export async function getStorageUrl(key: string): Promise<string> {
  return await storage.generatePresignedUrl({
    key,
    expireTime: 31536000, // 1年
  });
}
