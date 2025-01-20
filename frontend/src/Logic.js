export function containsWordsIgnoreCase(text) {
    const suicideWords = [
        "suicide", "depressed", "hopeless", "alone", "end", 
        "worthless", "kill", "die", "death", "pain", 
        "self-harm", "goodbye", "despair", "hurt", "overdose"
    ];
    
    const normalizedText = text.toLowerCase();
    const wordsInText = normalizedText.split(/\s+/); // Split by whitespace
    
    let matchCount = 0;
    
    suicideWords.forEach((word) => {
        if (wordsInText.includes(word)) {
          matchCount++;
        }
    });
    
    const matchPercentage = (matchCount / suicideWords.length) * 100;
    
    return matchPercentage;
}