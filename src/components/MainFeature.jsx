import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const MainFeature = () => {
  const [description, setDescription] = useState('');
  const [nameResults, setNameResults] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCopied, setIsCopied] = useState(null);
  
  // Icon components declaration (BEFORE return statement)
  const SparklesIcon = getIcon('Sparkles');
  const RefreshCwIcon = getIcon('RefreshCw');
  const CopyIcon = getIcon('Copy');
  const CheckIcon = getIcon('Check');
  const StarIcon = getIcon('Star');
  const HeartIcon = getIcon('Heart');
  const ZapIcon = getIcon('Zap');
  const BrainIcon = getIcon('Brain');
  const RocketIcon = getIcon('Rocket');
  
  // Reset copy states after a timeout
  useEffect(() => {
    if (isCopied !== null) {
      const timer = setTimeout(() => {
        setIsCopied(null);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isCopied]);
  
  // Categories for name generation
  const categories = [
    { id: 'all', name: 'All Types', icon: SparklesIcon },
    { id: 'catchy', name: 'Catchy', icon: ZapIcon },
    { id: 'tech', name: 'Tech', icon: BrainIcon },
    { id: 'creative', name: 'Creative', icon: HeartIcon },
    { id: 'professional', name: 'Professional', icon: RocketIcon }
  ];
  
  // Helper to generate domain style names based on description
  const generateNames = () => {
    if (!description.trim()) {
      toast.error("Please enter a description first!");
      return;
    }
    
    setIsGenerating(true);
    
    // Simulating API call with timeout
    setTimeout(() => {
      // Word bank related to app naming
      const prefixes = ['App', 'Web', 'Net', 'Dev', 'Tech', 'Code', 'Byte', 'Bit', 'Digi', 'Cyber', 'Data', 'Flow', 'Sync', 'Swift', 'Pulse', 'Node', 'Logic', 'Smart', 'Clear', 'Fast'];
      const suffixes = ['ly', 'ify', 'ize', 'ium', 'ible', 'able', 'ics', 'hub', 'lab', 'tech', 'ware', 'edge', 'wire', 'sync', 'spot', 'dash', 'base', 'port', 'cast', 'lift'];
      const compounds = ['Lab', 'Hub', 'Net', 'Flow', 'Wave', 'Forge', 'Stack', 'Box', 'Link', 'Craft', 'Sphere', 'Mind', 'Cloud', 'Connect', 'Space', 'Works', 'Zone', 'Logic', 'Ware', 'Engine'];
      
      // Extract keywords from description
      const keywords = description.toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .split(' ')
        .filter(word => word.length > 3)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1));
      
      // Generate random names using the extracted keywords and word banks
      const newNames = [];
      
      // Create different types of names
      for (let i = 0; i < 12; i++) {
        const keyword = keywords[Math.floor(Math.random() * keywords.length)] || prefixes[Math.floor(Math.random() * prefixes.length)];
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        const compound = compounds[Math.floor(Math.random() * compounds.length)];
        
        let name = '';
        let category = '';
        
        // Different name generation patterns
        const pattern = Math.floor(Math.random() * 5);
        switch (pattern) {
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
          default:
            name = keyword + 'App';
            category = 'tech';
        }
        
        // Add to results if not duplicate
        if (!newNames.some(n => n.name === name)) {
          newNames.push({
            id: Date.now() + i,
            name,
            category,
            relevanceScore: Math.floor(Math.random() * 30) + 70 // 70-99 relevance score
          });
        } else {
          // Try again if duplicate
          i--;
        }
      }
      
      setNameResults(newNames);
      setIsGenerating(false);
      toast.success("Name ideas generated successfully!");
    }, 1500);
  };
  
  // Copy name to clipboard
  const copyToClipboard = (name, id) => {
    navigator.clipboard.writeText(name).then(() => {
      setIsCopied(id);
      toast.info(`Copied ${name} to clipboard!`);
    });
  };
  
  // Filter results based on selected category
  const filteredResults = selectedCategory === 'all' 
    ? nameResults 
    : nameResults.filter(result => result.category === selectedCategory);
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div 
        className="card-neu mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <label htmlFor="description" className="block text-lg font-medium mb-2">
            Describe your app or project
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="E.g., A productivity app that helps remote teams collaborate on projects with task tracking and file sharing features..."
            className="input-field h-32 resize-none"
            disabled={isGenerating}
          />
        </div>
        
        <div className="flex flex-wrap gap-4 mb-6">
          {categories.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-2 rounded-xl flex items-center text-sm md:text-base transition-all ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white shadow-soft font-medium'
                    : 'bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-300 hover:bg-surface-300 dark:hover:bg-surface-600'
                }`}
              >
                <CategoryIcon className="h-4 w-4 mr-2" />
                {category.name}
              </button>
            );
          })}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={generateNames}
            disabled={isGenerating || !description.trim()}
            className={`btn flex-1 flex items-center justify-center ${
              isGenerating || !description.trim()
                ? 'bg-surface-300 dark:bg-surface-700 cursor-not-allowed'
                : 'btn-primary'
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCwIcon className="h-5 w-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <SparklesIcon className="h-5 w-5 mr-2" />
                Generate Names
              </>
            )}
          </motion.button>
          
          {nameResults.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={generateNames}
              disabled={isGenerating}
              className={`btn flex items-center justify-center ${
                isGenerating
                  ? 'bg-surface-300 dark:bg-surface-700 cursor-not-allowed'
                  : 'btn-secondary'
              }`}
            >
              <RefreshCwIcon className="h-5 w-5 mr-2" />
              Regenerate
            </motion.button>
          )}
        </div>
      </motion.div>
      
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="mb-6"
            >
              <SparklesIcon className="h-12 w-12 text-primary" />
            </motion.div>
            <p className="text-lg text-surface-600 dark:text-surface-300">
              Crafting the perfect names for your app...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {!isGenerating && nameResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-6 flex items-center">
              <StarIcon className="h-6 w-6 mr-2 text-primary" />
              Name Suggestions
              <span className="ml-2 text-sm font-normal text-surface-500 dark:text-surface-400">
                ({filteredResults.length} results)
              </span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResults.map((result) => {
                const isCurrent = isCopied === result.id;
                return (
                  <motion.div
                    key={result.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="card relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 bg-surface-100 dark:bg-surface-700 px-2 py-1 text-xs rounded-bl-lg capitalize text-surface-500 dark:text-surface-300">
                      {result.category}
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className="text-center"
                    >
                      <h4 className="text-xl md:text-2xl font-bold mb-2 text-gradient">
                        {result.name}
                      </h4>
                      
                      <div className="flex justify-center items-center mb-2">
                        <div className="h-2 w-full max-w-[120px] bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                            style={{ width: `${result.relevanceScore}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-xs text-surface-500 dark:text-surface-400">
                          {result.relevanceScore}%
                        </span>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => copyToClipboard(result.name, result.id)}
                        className="mt-2 w-full py-2 rounded-lg bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors flex items-center justify-center"
                      >
                        {isCurrent ? (
                          <>
                            <CheckIcon className="h-4 w-4 mr-1 text-green-500" />
                            <span className="text-green-500">Copied!</span>
                          </>
                        ) : (
                          <>
                            <CopyIcon className="h-4 w-4 mr-1" />
                            <span>Copy</span>
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainFeature;