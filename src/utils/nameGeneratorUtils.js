/**
 * A simple seeded random number generator
 * Using a Linear Congruential Generator algorithm
 */
class SeededRandom {
  constructor(seed = Date.now()) {
    this.seed = seed % 2147483647;
    if (this.seed <= 0) this.seed += 2147483646;
  }

  // Returns a random number between 0 and 1
  next() {
    this.seed = (this.seed * 16807) % 2147483647;
    return this.seed / 2147483647;
  }

  // Returns a random integer between min (inclusive) and max (inclusive)
  nextInt(min, max) {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  // Randomly selects an item from an array
  choice(array) {
    return array[this.nextInt(0, array.length - 1)];
  }
}

// Word banks for name generation
const prefixes = ['App', 'Web', 'Net', 'Dev', 'Tech', 'Code', 'Byte', 'Bit', 'Digi', 'Cyber', 'Data', 'Flow', 'Sync', 'Swift', 'Pulse', 'Node', 'Logic', 'Smart', 'Clear', 'Fast'];
const suffixes = ['ly', 'ify', 'ize', 'ium', 'ible', 'able', 'ics', 'hub', 'lab', 'tech', 'ware', 'edge', 'wire', 'sync', 'spot', 'dash', 'base', 'port', 'cast', 'lift'];
const compounds = ['Lab', 'Hub', 'Net', 'Flow', 'Wave', 'Forge', 'Stack', 'Box', 'Link', 'Craft', 'Sphere', 'Mind', 'Cloud', 'Connect', 'Space', 'Works', 'Zone', 'Logic', 'Ware', 'Engine'];

/**
 * Generates app names based on a description using a seeded random generator
 * @param {string} description - The description of the app
 * @param {number} seed - The seed for random generation
 * @param {number} count - Number of names to generate
 * @returns {Array} Array of name objects
 */
export const generateAppNames = (description, seed = Date.now(), count = 12) => {
  // Initialize the seeded random generator
  const random = new SeededRandom(seed);
  
  // Extract keywords from description
  const keywords = description.toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .split(' ')
    .filter(word => word.length > 3)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1));
  
  // If no valid keywords found, use a prefix as keyword
  if (keywords.length === 0) {
    keywords.push(random.choice(prefixes));
  }
  
  // Generate random names using the extracted keywords and word banks
  const newNames = [];
  
  // Create different types of names
  for (let i = 0; i < count; i++) {
    const keyword = random.choice(keywords) || random.choice(prefixes);
    const prefix = random.choice(prefixes);
    const suffix = random.choice(suffixes);
    const compound = random.choice(compounds);
    
    let name = '';
    let category = '';
    
    // Different name generation patterns
    const pattern = random.nextInt(0, 4);
    switch (pattern) {
      case 0: name = keyword + suffix; category = 'catchy'; break;
      case 1: name = prefix + keyword; category = 'tech'; break;
      case 2: name = keyword + compound; category = 'professional'; break;
      case 3: name = compound + keyword.toLowerCase(); category = 'creative'; break;
      case 4: name = prefix + suffix; category = 'catchy'; break;
      default: name = keyword + 'App'; category = 'tech';
    }
    
    // Add to results if not duplicate
    if (!newNames.some(n => n.name === name)) {
      newNames.push({
        id: seed + i,
        name,
        category,
        relevanceScore: random.nextInt(70, 99), // 70-99 relevance score
        generatedAt: new Date().toISOString(), // Record generation timestamp
        seed // Store the seed used for generation
      });
    } else { i--; } // Try again if duplicate
  }
  
  return newNames;
};