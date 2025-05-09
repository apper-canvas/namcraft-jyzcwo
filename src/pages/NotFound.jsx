import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const NotFound = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    toast.info("This page doesn't exist. Redirecting you shortly...");
    
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  // Icon components
  const HomeIcon = getIcon('Home');
  const AlertCircleIcon = getIcon('AlertCircle');
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md w-full"
      >
        <div className="bg-surface-100 dark:bg-surface-800 rounded-2xl shadow-neu-light dark:shadow-neu-dark p-8 md:p-12">
          <div className="mb-6 flex justify-center">
            <AlertCircleIcon className="h-20 w-20 text-secondary" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Page Not Found</h2>
          
          <p className="text-surface-600 dark:text-surface-300 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary w-full flex items-center justify-center"
            >
              <HomeIcon className="h-5 w-5 mr-2" />
              Return Home
            </motion.button>
          </Link>
        </div>
        
        <div className="mt-6 text-surface-500 dark:text-surface-400">
          <p>You'll be redirected automatically in a few seconds.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;