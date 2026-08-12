// Script to convert TypeScript translation files to JSON
const fs = require('fs');
const path = require('path');

const locales = ['en', 'fr', 'zh', 'de'];

locales.forEach((locale) => {
  try {
    // Import the translation file
    const translationModule = require(`../lib/i18n/translations/${locale}.ts`);
    
    // Extract the exported object (named export)
    const translations = translationModule[locale];
    
    if (!translations) {
      console.error(`No translations found for locale: ${locale}`);
      return;
    }
    
    // Convert to JSON and write to messages directory
    const jsonContent = JSON.stringify(translations, null, 2);
    const outputPath = path.join(__dirname, '..', 'messages', `${locale}.json`);
    
    fs.writeFileSync(outputPath, jsonContent, 'utf8');
    console.log(`✓ Converted ${locale}.ts to ${locale}.json`);
  } catch (error) {
    console.error(`✗ Error converting ${locale}:`, error.message);
  }
});

console.log('\nConversion complete!');
