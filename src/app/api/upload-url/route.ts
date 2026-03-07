import { NextRequest, NextResponse } from 'next/server';
import { S3Storage } from "coze-coding-dev-sdk";

const endpointUrl = process.env.COZE_BUCKET_ENDPOINT_URL || "https://s3.coze-coding.com";
const bucketName = process.env.COZE_BUCKET_NAME || "xingtongfengyu";

const storage = new S3Storage({
  endpointUrl,
  accessKey: "",
  secretKey: "",
  bucketName,
  region: "cn-beijing",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fileName, fileType } = body;

    if (!fileName || !fileType) {
      return NextResponse.json({ error: 'Missing fileName or fileType' }, { status: 400 });
    }

    // 生成对象 key
    const key = `uploads/${Date.now()}_${fileName}`;

    // 生成 presigned URL（用于直接上传）
    const uploadUrl = await storage.generatePresignedUrl({
      key,
      expireTime: 3600, // 1小时有效期
      method: 'PUT', // 允许 PUT 请求
    });

    // 生成访问 URL（用于播放）
    const accessUrl = await storage.generatePresignedUrl({
      key,
      expireTime: 31536000, // 1年有效期
    });

    return NextResponse.json({
      success: true,
      uploadUrl,
      accessUrl,
      key,
    });
  } catch (error: any) {
    console.error('Get upload URL error:', error);
    return NextResponse.json({
      error: 'Failed to get upload URL',
      message: error?.message || 'Unknown error'
    }, { status: 500 });
  }
}
