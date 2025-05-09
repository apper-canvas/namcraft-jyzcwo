import { useState } from 'react';
import { toast } from 'react-toastify';
import { generateAppNames } from '../utils/nameGeneratorUtils';

/**
 * Custom hook to handle name generation logic
 */
const useNameGenerator = () => {
  const [description, setDescription] = useState('');
  const [nameResults, setNameResults] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentSeed, setCurrentSeed] = useState(null);
  const [seedHistory, setSeedHistory] = useState([]);

  /**
   * Generate names based on description and seed
   * @param {boolean} useSameSeed - Whether to use the same seed or generate a new one
   */
  const generateNames = (useSameSeed = false) => {
    if (!description.trim()) {
      toast.error("Please enter a description first!");
      return;
    }
    
    setIsGenerating(true);
    
    // Determine which seed to use
    const seed = useSameSeed && currentSeed ? currentSeed : Date.now();
    
    // Store seed in history if it's new
    if (!useSameSeed || !currentSeed) {
      setCurrentSeed(seed);
      setSeedHistory(prev => [...prev.slice(-9), seed]); // Keep last 10 seeds
    }
    
    // Simulate API delay
    setTimeout(() => {
      try {
        const newNames = generateAppNames(description, seed);
        setNameResults(newNames);
        toast.success("Name ideas generated successfully!");
      } catch (error) {
        toast.error("Failed to generate names. Please try again.");
        console.error(error);
      } finally {
        setIsGenerating(false);
      }
    }, 1500);
  };

  return { description, setDescription, nameResults, isGenerating, generateNames, currentSeed, seedHistory };
};

export default useNameGenerator;