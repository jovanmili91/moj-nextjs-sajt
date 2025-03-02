require('dotenv').config({
  path: 'C:\\Users\\jovan\\projektikuce-novi\\.env.local',
});
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs').promises;
const path = require('path');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function checkSpecificFilesTogether() {
  const filesToCheck = [
    'C:\\Users\\jovan\\projektikuce-novi\\src\\app\\projekti-kuce\\[id]\\page.js',
    'C:\\Users\\jovan\\projektikuce-novi\\src\\app\\projekti-kuce\\page.js',
    'C:\\Users\\jovan\\projektikuce-novi\\src\\lib\\getProjects.js',
    'C:\\Users\\jovan\\projektikuce-novi\\src\\app\\api\\projects\\route.js',
    'C:\\Users\\jovan\\projektikuce-novi\\src\\app\\projekti-kuce\\ProjectsClient.js',
  ];

  try {
    // Pročitaj sadržaj svih fajlova
    const fileContents = await Promise.all(
      filesToCheck.map(async (filePath) => ({
        path: filePath,
        content: await fs.readFile(filePath, 'utf-8'),
      }))
    );

    // Kreiraj prompt sa svim fajlovima zajedno
    const prompt = `
      Analiziraj i optimizuj sledeće fajlove iz Next.js projekta zajedno kako bi identifikovao i rešio probleme na nivou grupe fajlova. Fokusiraj se na:
      1. Pronalaženje i popravku grešaka u kodu (npr. sintaksne greške, logički problemi).
      2. Optimizaciju performansi (npr. uklanjanje dupliranog koda, optimizacija API poziva i učitavanja podataka).
      3. Poboljšanje SEO-a uključujući ključne reči "projektovanje kuće", "projektovanje kuća", "projektovanje" u relevantnim delovima.
      4. Unapređenje UI/UX dizajna (npr. konzistentnost između stranica, responzivnost).
      5. Proveru Next.js najboljih praksi (statička generacija, serverske komponente, API rute).
      6. Predlaganje poboljšanja u strukturi ili novih komponenti ako je potrebno.
      7. Detaljan izveštaj o problemima, predloženim promenama i optimizovan kod sa komentarima za svaki fajl.

      Fajlovi i njihov sadržaj:
      ${fileContents.map((file) => `Fajl: ${file.path}\nSadržaj:\n${file.content}\n---\n`).join('\n')}
    `;

    // Pozovi API sa streaming-om
    const stream = await anthropic.messages.stream({
      model: 'claude-3-7-sonnet-20250219',
      max_tokens: 40000,
      messages: [{ role: 'user', content: prompt }],
    });

    let result = '';
    stream.on('text', (text) => {
      result += text;
      process.stdout.write(text); // Ispisuj u realnom vremenu
    });

    stream.on('end', async () => {
      console.log('\nStream završen.');
      // Sačuvaj rezultat u fajl
      const outputPath = path.join(
        'C:\\Users\\jovan\\projektikuce-novi',
        'optimization-report-specific-files.txt'
      );
      await fs.writeFile(outputPath, result);
      console.log(`Rezultat sačuvan u: ${outputPath}`);
    });

    stream.on('error', (error) => {
      throw error; // Prosledi grešku dalje
    });
  } catch (error) {
    console.error('Greška pri obradi fajlova:', error);
  }
}

// Pokreni proveru
checkSpecificFilesTogether().catch(console.error);
