import { NextResponse } from 'next/server';

function calculateJaccardSimilarity(text1: string, text2: string): number {
  const normalize = (str: string) => str.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 2);
  const set1 = new Set(normalize(text1));
  const set2 = new Set(normalize(text2));
  
  if (set1.size === 0 || set2.size === 0) return 0;
  
  let intersectionSize = 0;
  for (const item of set1) {
    if (set2.has(item)) {
      intersectionSize++;
    }
  }
  
  const unionSize = set1.size + set2.size - intersectionSize;
  return intersectionSize / unionSize;
}

function calculateAIHeuristics(text: string): number {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  if (sentences.length < 2) return Math.floor(Math.random() * 20); // Not enough data
  
  const lengths = sentences.map(s => s.trim().split(/\s+/).length);
  const mean = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  const variance = lengths.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / lengths.length;
  const stdDev = Math.sqrt(variance);
  
  // AI tends to have more uniform sentence lengths (lower stdDev)
  // Humans have higher burstiness (higher stdDev)
  // Let's create a heuristic score out of 100
  let aiScore = 0;
  if (stdDev < 5) aiScore = 85; 
  else if (stdDev < 8) aiScore = 60;
  else if (stdDev < 12) aiScore = 30;
  else aiScore = 5;
  
  // Add some random noise for realism
  aiScore += Math.floor(Math.random() * 10) - 5;
  return Math.max(0, Math.min(100, aiScore));
}

const RATE_LIMIT_MS = 3000; // 3 seconds between requests
const ipCache = new Map<string, number>();

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'local';
    const now = Date.now();
    const lastRequest = ipCache.get(ip);
    
    if (lastRequest && (now - lastRequest) < RATE_LIMIT_MS) {
      return NextResponse.json({ error: 'Too many requests. Please wait.' }, { status: 429 });
    }
    ipCache.set(ip, now);

    const { text } = await request.json();
    
    if (!text || text.trim().length === 0) {
      return NextResponse.json({ similarityIndex: 0, aiScore: 0, topSources: [] });
    }

    // 1. Extract key query terms (first 3 long words to simulate a chunk)
    const words = text.replace(/[^\w\s]/g, '').split(/\s+/).filter((w: string) => w.length > 5);
    const query = words.slice(0, 3).join(' ');

    let similarityIndex = 0;
    const topSources: { url: string, percentage: number }[] = [];

    // 2. Query Wikipedia API if we have enough text
    if (query.length > 0) {
      const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&origin=*`;
      const wikiRes = await fetch(wikiUrl);
      
      if (wikiRes.ok) {
        const wikiData = await wikiRes.json();
        const searchResults = wikiData.query?.search || [];
        
        let aggregatedSnippets = '';
        
        for (let i = 0; i < Math.min(3, searchResults.length); i++) {
          const result = searchResults[i];
          const cleanSnippet = result.snippet.replace(/<\/?[^>]+(>|$)/g, ""); // strip HTML
          aggregatedSnippets += cleanSnippet + ' ';
          
          // Calculate specific similarity for this source
          const sourceSim = calculateJaccardSimilarity(text, cleanSnippet);
          const scaledPercent = Math.min(100, Math.floor(sourceSim * 500)); // Arbitrary scaler for demonstration
          
          if (scaledPercent > 2) {
             topSources.push({
               url: `en.wikipedia.org/wiki/${encodeURIComponent(result.title.replace(/ /g, '_'))}`,
               percentage: scaledPercent
             });
          }
        }
        
        // Calculate overall Jaccard against aggregated snippets
        if (aggregatedSnippets.length > 0) {
          const rawJaccard = calculateJaccardSimilarity(text, aggregatedSnippets);
          // Scale it up significantly to represent a realistic % for small text chunks
          similarityIndex = Math.min(100, Math.floor(rawJaccard * 500)); 
        }
      }
    }

    // 3. Heuristic AI scoring
    const aiScore = calculateAIHeuristics(text);
    
    // Fallback if no sources found
    if (topSources.length === 0 && similarityIndex > 0) {
       topSources.push({ url: "Unknown Web Source", percentage: similarityIndex });
    }

    return NextResponse.json({ 
      similarityIndex, 
      aiScore, 
      topSources: topSources.sort((a,b) => b.percentage - a.percentage)
    });
    
  } catch (error: any) {
    console.error('Analyze error:', error);
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}
