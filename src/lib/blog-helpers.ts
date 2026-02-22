// src/lib/blog-helpers.ts

// 1. Ekstrak teks mentah dari Portable Text Sanity
function extractTextFromBlocks(blocks: any[]): string {
  if (!blocks) return '';
  return blocks
    .filter((block) => block._type === 'block' && block.children)
    .map((block) => block.children.map((child: any) => child.text).join(''))
    .join(' ');
}

// 2. Hitung Waktu Baca (Standar 200 kata/menit)
export function getReadingTime(blocks: any[]): number {
  const text = extractTextFromBlocks(blocks);
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / 200) || 1;
}

// 3. Ekstrak Table of Content (Ambil elemen H2 & H3)
export function generateToC(blocks: any[]) {
  if (!blocks) return [];
  return blocks
    .filter(
      (block) =>
        block._type === 'block' &&
        (block.style === 'h2' || block.style === 'h3'),
    )
    .map((block) => ({
      title: block.children[0]?.text || '',
      style: block.style, // Untuk membedakan indentasi H2 vs H3 di UI
      id: block.children[0]?.text.toLowerCase().replace(/\s+/g, '-'), // Generate anchor ID
    }));
}
