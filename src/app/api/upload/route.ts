import { NextRequest, NextResponse } from 'next/server';
import { S3Storage } from "coze-coding-dev-sdk";

const endpointUrl = process.env.COZE_BUCKET_ENDPOINT_URL || "https://s3.coze-coding.com";
const bucketName = process.env.COZE_BUCKET_NAME || "xingtongfengyu";

console.log('Upload API init:', { endpointUrl, bucketName });

const storage = new S3Storage({
  endpointUrl,
  accessKey: "",
  secretKey: "",
  bucketName,
  region: "cn-beijing",
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Cloudflare Pages 限制：文件大小不能太大
    const maxSize = 25 * 1024 * 1024; // 25MB
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: 'File too large',
        message: `File size ${file.size} exceeds limit of ${maxSize} bytes`
      }, { status: 413 });
    }

    // 转换为 Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 上传到 S3
    const key = await storage.uploadFile({
      fileContent: buffer,
      fileName: `uploads/${Date.now()}_${file.name}`,
      contentType: file.type || 'application/octet-stream',
    });

    // 生成访问 URL
    const url = await storage.generatePresignedUrl({
      key,
      expireTime: 31536000, // 1年
    });

    return NextResponse.json({
      success: true,
      key: key,
      url: url,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: 'Upload failed', 
      message: error?.message || 'Unknown error',
      details: error?.toString?.substring(0, 500)
    }, { status: 500 });
  }
}
