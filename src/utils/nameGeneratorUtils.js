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
const prefixes = [
  'App', 'Web', 'Net', 'Dev', 'Tech', 'Code', 'Byte', 'Bit', 'Digi', 'Cyber', 
  'Data', 'Flow', 'Sync', 'Swift', 'Pulse', 'Node', 'Logic', 'Smart', 'Clear', 'Fast',
  'Pixel', 'Flux', 'Meta', 'Echo', 'Vibe', 'Lens', 'Boost', 'Spark', 'Core', 'Atom',
  'Quik', 'Apex', 'Next', 'Prime', 'Aura', 'Nexus', 'Vital', 'Hyper', 'Ultra', 'Alpha',
  'Nova', 'Titan', 'Mega', 'Beta', 'Cloud', 'Turbo', 'Blitz', 'Zeta', 'Evo', 'Quantum'
];

const middles = [
  'Flow', 'Hub', 'Link', 'Sync', 'Mind', 'Core', 'Wave', 'Pulse', 'Node', 'Base',
  'Sphere', 'Space', 'Cloud', 'Loop', 'Stack', 'Logic', 'Data', 'Grid', 'Net', 'Path',
  'Stream', 'Pixel', 'Fusion', 'Bridge', 'Chain', 'Forge', 'Drive', 'Edge', 'Trace', 'Connect',
  'Matrix', 'Channel', 'Thread', 'Scope', 'Hive', 'Vault', 'Echo', 'Shift', 'Beacon', 'Junction'
];

const suffixes = [
  'ly', 'ify', 'ize', 'ium', 'ible', 'able', 'ics', 'hub', 'lab', 'tech', 
  'ware', 'edge', 'wire', 'sync', 'spot', 'dash', 'base', 'port', 'cast', 'lift',
  'zen', 'axis', 'era', 'vista', 'nova', 'flux', 'scape', 'forge', 'verse', 'guard',
  'quest', 'mind', 'pulse', 'grid', 'scope', 'vision', 'blend', 'surge', 'wave', 'glow',
  'mesh', 'craft', 'orbit', 'nexus', 'boost', 'peak', 'realm', 'flow', 'leap', 'zone'
];

const compounds = [
  'Lab', 'Hub', 'Net', 'Flow', 'Wave', 'Forge', 'Stack', 'Box', 'Link', 'Craft', 
  'Sphere', 'Mind', 'Cloud', 'Connect', 'Space', 'Works', 'Zone', 'Logic', 'Ware', 'Engine',
  'Bridge', 'Drive', 'Beam', 'Loop', 'Chain', 'Atlas', 'Nexus', 'Pulse', 'Vector', 'Beacon',
  'Scope', 'Spark', 'Grove', 'Track', 'Hive', 'Vista', 'Core', 'Port', 'Vault', 'Matrix'
];

/**
 * Generates app names based on a description using a seeded random generator
 * @param {string} description - The description of the app
 * @param {number} seed - The seed for random generation
 * @returns {Object} A single name object
 */
export const generateAppNames = (description, seed = Date.now()) => {
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
  
  // Get a random keyword or prefix to work with
  const keyword = random.choice(keywords) || random.choice(prefixes);
  const prefix = random.choice(prefixes);
  const suffix = random.choice(suffixes);
  const middle = random.choice(middles);
  const compound = random.choice(compounds);
  let name = '';
  let category = '';
  
  // Different name generation patterns
  const pattern = random.nextInt(0, 9);
  switch (pattern) {
    // Two-word combinations
    case 0: 
      name = keyword + suffix; 
      category = 'catchy'; 
      break;
    case 1: 
      name = prefix + keyword; 
      category = 'tech'; 
      break;
    case 2: 
      name = keyword + compound; 
      category = 'professional'; 
      break;
    case 3: 
      name = compound + keyword.toLowerCase(); 
      category = 'creative'; 
      break;
    case 4: 
      name = prefix + suffix; 
      category = 'catchy'; 
      break;
    // Three-word combinations
    case 5: 
      name = prefix + middle + suffix; 
      category = 'innovative'; 
      break;
    case 6: 
      name = keyword + middle + suffix; 
      category = 'sophisticated'; 
      break;
    case 7: 
      name = prefix + middle.toLowerCase() + keyword.toLowerCase(); 
      category = 'modern'; 
      break;
    case 8: 
      name = middle + compound + suffix; 
      category = 'premium'; 
      break;
    case 9: 
      name = prefix + compound.toLowerCase() + suffix; 
      category = 'advanced'; 
      break;
  }
  
  // Calculate relevance score based on pattern complexity
  let relevanceBase = pattern > 4 ? 88 : 85; // Higher base score for three-word names
  
  // Create a single name object
  const nameObject = {
    id: seed,
    name,
    category,
    relevanceScore: random.nextInt(relevanceBase, 99), // Higher relevance score for single result
    generatedAt: new Date().toISOString(), // Record generation timestamp
    seed // Store the seed used for generation
  };
  
  return nameObject;
};