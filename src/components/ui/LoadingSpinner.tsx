import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: number;
  fullScreen?: boolean;
}

const LoadingSpinner = ({ size = 80, fullScreen = true }: LoadingSpinnerProps) => {
  // Pentagram SVG path
  const pentagramPath = "M50 5 L61 38 L95 38 L68 58 L79 91 L50 71 L21 91 L32 58 L5 38 L39 38 Z";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`${
        fullScreen
          ? 'fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm'
          : 'flex items-center justify-center'
      }`}
      role="status"
      aria-label="Loading"
    >
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ width: size, height: size, willChange: 'transform' }}
      >
        <motion.svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          animate={{
            filter: [
              'drop-shadow(0 0 10px rgba(220, 20, 60, 0.5))',
              'drop-shadow(0 0 30px rgba(220, 20, 60, 0.9))',
              'drop-shadow(0 0 10px rgba(220, 20, 60, 0.5))',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ willChange: 'filter' }}
        >
          <path
            d={pentagramPath}
            fill="#DC143C"
            stroke="#8B0000"
            strokeWidth="2"
          />
        </motion.svg>
      </motion.div>
      <span className="sr-only">Loading...</span>
    </motion.div>
  );
};

export default LoadingSpinner;
