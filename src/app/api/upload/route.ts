import { NextRequest, NextResponse } from 'next/server';
import { uploadToStorage } from '@/lib/storage';

export async function POST(req: NextRequest) {
  try {
    console.log('=== Upload API called ===');
    
    const formData = await req.formData();
    const file = formData.get('file') as File;

    console.log('Received file:', { 
      hasFile: !!file, 
      name: file?.name, 
      size: file?.size, 
      type: file?.type 
    });

    if (!file) {
      console.log('Error: No file provided');
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const result = await uploadToStorage(file);

    console.log('Upload result:', { 
      success: true, 
      key: result.key, 
      url: result.url.substring(0, 100) + '...' 
    });

    return NextResponse.json({
      success: true,
      key: result.key,
      url: result.url,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json({ 
      error: 'Upload failed', 
      message: error?.message || 'Unknown error',
      details: error?.toString()
    }, { status: 500 });
  }
}
