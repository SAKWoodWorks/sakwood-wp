import { NextResponse } from 'next/server';

/**
 * API route to proxy Thai font fetch
 * This bypasses CORS issues by fetching server-side
 */
export async function GET() {
  try {
    // Use jsdelivr CDN for Sarabun font (regular weight)
    const fontUrl = 'https://cdn.jsdelivr.net/npm/@th/webfont-sarabun@1.0.2/fonts/Sarabun-Regular.woff2';

    const response = await fetch(fontUrl, {
      // Cache for 1 day
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch font: ${response.status} ${response.statusText}` },
        { status: 500 }
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Convert binary to base64
    const binaryString = uint8Array.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    const base64 = btoa(binaryString);

    // Return as JSON with proper CORS headers
    return NextResponse.json(
      { fontData: base64 },
      {
        headers: {
          'Cache-Control': 'public, max-age=86400', // Cache for 1 day
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Failed to load Thai font:', error);
    return NextResponse.json(
      { error: 'Failed to fetch font' },
      { status: 500 }
    );
  }
}
