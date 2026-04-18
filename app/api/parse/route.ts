import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filename = file.name.toLowerCase();

    let text = '';
    
    try {
      if (filename.endsWith('.pdf')) {
        const pdfParse = require('pdf-parse');
        const data = await pdfParse(buffer);
        text = data.text;
      } else if (filename.endsWith('.docx')) {
        const mammoth = require('mammoth');
        // Extracting raw text from the .docx zip structure
        const result = await mammoth.extractRawText({ buffer });
        text = result.value;
      } else if (filename.endsWith('.txt')) {
        text = buffer.toString('utf-8');
      } else {
        // Simple fallback for other text-based formats
        text = buffer.toString('utf-8');
      }
    } catch (libError: any) {
      console.error('Parsing Library Error:', libError);
      
      // Fallback: If library fails, try to strip binary characters as a last resort
      // only for likely text-heavy files
      if (buffer.length < 1000000) { // 1MB limit for unsafe fallback
         text = buffer.toString('utf-8').replace(/[^\x20-\x7E\n\t]/g, ' ');
      }
      
      if (!text || text.trim().length < 10) {
        return NextResponse.json({ 
          error: 'Library failed to extract text.', 
          details: libError.message || 'The specific file structure was incompatible with the parser.' 
        }, { status: 500 });
      }
    }

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: 'The document appears to be empty.' }, { status: 422 });
    }

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error('General Parsing API error:', error);
    return NextResponse.json({ error: 'Failed to process the document.', details: error.message }, { status: 500 });
  }
}
