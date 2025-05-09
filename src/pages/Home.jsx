import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate loading delay for animation effect
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Icon components
  const WandIcon = getIcon('Wand');
  const GithubIcon = getIcon('Github');
  const InfoIcon = getIcon('Info');
  
  return (
    <div className="min-h-screen">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-light/20 to-secondary-light/20 dark:from-primary-dark/10 dark:to-secondary-dark/10 z-0 pointer-events-none"></div>
        <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center justify-between"
          >
            <div className="flex items-center mb-6 md:mb-0">
              <WandIcon className="h-8 w-8 mr-3 text-primary" />
              <h1 className="text-3xl font-bold text-gradient">NamCraft</h1>
            </div>
            
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link 
                    to="/how-it-works" 
                    className="flex items-center text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors"
                  >
                    <InfoIcon className="h-5 w-5 mr-1" />
                    <span className="hidden md:inline">
                      How It Works
                    </span>
                  </Link>
                </li>
                <li>
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors"
                  >
                    <GithubIcon className="h-5 w-5 mr-1" />
                    <span className="hidden md:inline">GitHub</span>
                  </a>
                </li>
              </ul>
            </nav>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-16">
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Generate Perfect App Names
                </h2>
                <p className="text-surface-600 dark:text-surface-300 text-lg md:text-xl">
                  Describe your application and we'll craft the ideal name that 
                  captures its essence.
                </p>
              </div>
              
              <MainFeature />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="container mx-auto px-4 py-8 md:py-12 border-t border-surface-200 dark:border-surface-800">
        <div className="text-center text-surface-500 dark:text-surface-400 text-sm">
          <p>© {new Date().getFullYear()} NamCraft. All rights reserved.</p>
          <p className="mt-2">Crafted with ♥ for developers and creators.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;