require('dotenv').config({
  path: 'C:\\Users\\jovan\\projektikuce-novi\\.env.local',
});
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs').promises;
const path = require('path');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function analyzeAndOptimizeFiles() {
  const filesToAnalyze = [
    'C:\\Users\\jovan\\projektikuce-novi\\src\\components\\AboutClient.js',
    'C:\\Users\\jovan\\projektikuce-novi\\src\\app\\o-nama\\page.js',
  ];

  try {
    // Učitaj sadržaj fajlova
    const fileContents = await Promise.all(
      filesToAnalyze.map(async (filePath) => ({
        path: filePath,
        content: await fs.readFile(filePath, 'utf-8'),
      }))
    );

    // Kreiraj detaljan prompt za Claude-a
    const prompt = `
        Analiziraj i optimizuj sledeće fajlove iz Next.js projekta zajedno kako bi postigao najbolje moguće performanse, funkcionalnost i dizajn. Obrati pažnju na sledeće:
        
        1. **Uklanjanje viška i rešavanje problema**: Pronađi i popravi greške (sintaksne, logičke), ukloni duplicirani ili nepotrebni kod.
        2. **Performanse**: Optimizuj učitavanje podataka, renderovanje, i API pozive (ako ih ima). Primeni Next.js najbolje prakse poput statičke generacije ili serverskih komponenti gde je moguće.
        3. **SEO**: Integrisi ključne reči "projektovanje kuće", "projektovanje kuća", "projektovanje" u meta tagove, naslove, i sadržaj na prirodan način za bolju pretragu.
        4. **UI/UX**: Poboljšaj vizuelnu privlačnost i konzistentnost između komponenti/stranica, osiguraj responzivnost i moderan dizajn.
        5. **Next.js prakse**: Proveri upotrebu statičke generacije, serverskih komponenti, i optimizaciju slika (npr. next/image).
        6. **Predlozi**: Ako je potrebno, predloži nove fajlove ili komponente za bolju strukturu projekta (npr. helpers, utils, ili modularne komponente).
        7. **Izveštaj**: Pruzi detaljan izveštaj o problemima, predloženim promenama i optimizovanom kodu sa komentarima za svaki fajl.
  
        Koristi najnovije tehnike i resurse (npr. Next.js 14, moderne CSS prakse, performanse pretrage) za savršen rezultat.
  
        Fajlovi za analizu:
        ${fileContents.map((file) => `Fajl: ${file.path}\nSadržaj:\n${file.content}\n---\n`).join('\n')}
      `;

    // Pozovi Claude API sa streaming-om
    const stream = await anthropic.messages.stream({
      model: 'claude-3-7-sonnet-20250219',
      max_tokens: 40000,
      messages: [{ role: 'user', content: prompt }],
    });

    let fullResponse = '';
    stream.on('text', (text) => {
      fullResponse += text;
      process.stdout.write(text); // Real-time ispis
    });

    stream.on('end', async () => {
      console.log('\nAnaliza završena.');
      // Sačuvaj izveštaj
      const outputPath = path.join(
        'C:\\Users\\jovan\\projektikuce-novi',
        'optimization-report-about-files.txt'
      );
      await fs.writeFile(outputPath, fullResponse);
      console.log(`Izveštaj sačuvan u: ${outputPath}`);
    });

    stream.on('error', (error) => {
      throw error;
    });
  } catch (error) {
    console.error('Greška pri analizi fajlova:', error);
  }
}

// Pokreni skriptu
analyzeAndOptimizeFiles().catch(console.error);
