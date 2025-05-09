import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import useNameGenerator from '../hooks/useNameGenerator';
import getIcon from '../utils/iconUtils';

const MainFeature = () => {
  const { description, setDescription, nameResult, isGenerating, generateNames, currentSeed } = useNameGenerator();
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
  const InfoIcon = getIcon('Info');
  
  // Reset copy states after a timeout
  useEffect(() => {
    if (isCopied !== null) {
      const timer = setTimeout(() => {
        setIsCopied(null);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  // Copy name to clipboard
  const copyToClipboard = (name, id) => {
    navigator.clipboard.writeText(name).then(() => {
      setIsCopied(id);
      toast.success(`Copied ${name} to clipboard!`);
    });
  };
  
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
          {currentSeed && (
            <div className="mt-2 text-xs flex items-center text-surface-500 dark:text-surface-400">
              <InfoIcon className="w-3.5 h-3.5 mr-1" />
              <span>Generation seed: {currentSeed}</span>
              <span className="ml-2">(Results are reproducible with this seed)</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => generateNames(false)} // Generate with new seed
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
          
          {nameResult && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => generateNames(true)} // Regenerate with same seed
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
        {!isGenerating && nameResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-6 flex items-center justify-center">
              <StarIcon className="h-6 w-6 mr-2 text-primary" />
              Your App Name
              {currentSeed && (
                <span className="text-sm font-normal text-surface-500 dark:text-surface-400 ml-2">
                  (Seed: {currentSeed})
                </span>
              )}
            </h3>
            
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="card relative overflow-hidden group max-w-lg mx-auto"
            >
              <div className="absolute top-0 right-0 bg-surface-100 dark:bg-surface-700 px-2 py-1 text-xs rounded-bl-lg capitalize text-surface-500 dark:text-surface-300">
                {nameResult.category}
              </div>
              
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="text-center"
              >
                <h4 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
                  {nameResult.name}
                </h4>
                
                <div className="flex justify-center items-center mb-4">
                  <div className="h-3 w-full max-w-[200px] bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      style={{ width: `${nameResult.relevanceScore}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm text-surface-500 dark:text-surface-400">
                    {nameResult.relevanceScore}% match
                  </span>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => copyToClipboard(nameResult.name, nameResult.id)}
                  className="mt-4 w-full py-3 rounded-lg bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors flex items-center justify-center"
                >
                  {isCopied === nameResult.id ? (
                    <>
                      <CheckIcon className="h-5 w-5 mr-2 text-green-500" />
                      <span className="text-green-500 font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon className="h-5 w-5 mr-2" />
                      <span className="font-medium">Copy Name</span>
                    </>
                  )}
                </motion.button>

                <div className="mt-4 text-sm text-surface-400 dark:text-surface-500">
                  Generated on {new Date(nameResult.generatedAt || Date.now()).toLocaleString()}
                </div>
              </motion.div>
            </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainFeature;