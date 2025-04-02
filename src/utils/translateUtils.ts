/**
 * Utility functions for translating text using LibreTranslate API
 */

/**
 * Translates text to the target language
 * @param text The text to translate
 * @param targetLang The target language code (e.g., 'en', 'ar', 'ro')
 * @returns The translated text or the original text if translation fails
 */
export async function translateText(text: string, targetLang: string): Promise<string> {
  try {
    // Don't translate if the text is empty or the target language is English (default)
    if (!text || targetLang === 'en') {
      return text;
    }

    // For demonstration purposes, we'll use a simple mapping for common languages
    // In a real application, you would use a proper translation API
    // This is a fallback since LibreTranslate might require API keys
    
    console.log(`Translating to ${targetLang}: ${text.substring(0, 30)}...`);
    
    // Use Google Translate API (free endpoint)
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
      
      const res = await fetch(url);
      const data = await res.json();
      
      // Google Translate returns an array of arrays, where the first element
      // of each inner array is the translated text segment
      // Type the response structure from Google Translate
      // Each segment is [translated_text, original_text, null, null]
      type TranslationSegment = [string, string, null, null];

      if (data && Array.isArray(data[0])) {
        const translatedText = (data[0] as TranslationSegment[])
          .map(segment => segment[0])
          .join('');
        return translatedText;
      } else {
        console.warn("Translation API did not return expected format", data);
        throw new Error("Invalid translation response");
      }
    } catch (apiError) {
      console.warn("API translation failed, using fallback", apiError);
      // Fallback to simple prefix for demo purposes
      return `[${targetLang.toUpperCase()}] ${text}`;
    }
  } catch (error) {
    console.error("Translation error:", error);
    // Return original text if there was an error
    return text;
  }
}
