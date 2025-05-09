import { useState } from 'react';
import { generateAppNames } from '../utils/nameGeneratorUtils';
import { toast } from 'react-toastify';

const useNameGenerator = () => {
  const [description, setDescription] = useState('');
  const [nameResult, setNameResult] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentSeed, setCurrentSeed] = useState(null);

  const generateNames = async (useSameSeed = false) => {
    if (!description.trim()) {
      toast.warning('Please enter a description for your app.');
      return;
    }

    setIsGenerating(true);

    // Use either the existing seed or generate a new one
    const seed = useSameSeed && currentSeed ? currentSeed : Date.now();
    setCurrentSeed(seed);

    try {
      // Simulate an API call with a short delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      const result = generateAppNames(description, seed);
      setNameResult(result);
    } catch (error) {
      toast.error('Failed to generate name. Please try again.');
      console.error('Name generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return { description, setDescription, nameResult, isGenerating, generateNames, currentSeed };
};

export default useNameGenerator;
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