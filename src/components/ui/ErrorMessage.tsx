import React from 'react';
import { motion } from 'framer-motion';

interface ErrorMessageProps {
  error: Error | null;
  onRetry?: () => void;
  className?: string;
}

/**
 * Error message component with horror-themed styling
 * Displays user-friendly error messages with optional retry functionality
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  error, 
  onRetry,
  className = ''
}) => {
  if (!error) return null;

  // Get horror-themed error message
  const getErrorMessage = (error: Error): string => {
    const message = error.message.toLowerCase();
    
    // Check for specific error types
    if (message.includes('network') || message.includes('connection') || message.includes('fog')) {
      return 'Connection lost in the fog...';
    }
    if (message.includes('timeout') || message.includes('timed out')) {
      return 'The spirits took too long to respond...';
    }
    if (message.includes('not found') || message.includes('crypt') || message.includes('404')) {
      return 'This movie has vanished into the void...';
    }
    if (message.includes('api key') || message.includes('unauthorized') || message.includes('401')) {
      return 'The crypt keeper denies entry. Check your API key.';
    }
    if (message.includes('rate limit') || message.includes('too many') || message.includes('429')) {
      return 'Too many requests. The crypt is overwhelmed...';
    }
    if (message.includes('server') || message.includes('locked') || message.includes('500') || message.includes('503')) {
      return 'The crypt is locked. Try again later.';
    }
    
    // Default error message
    return error.message || 'Something sinister happened...';
  };

  const errorMessage = getErrorMessage(error);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`bg-darkness-800 border-2 border-blood-700 rounded-lg p-6 shadow-lg shadow-blood-900/30 ${className}`}
    >
      <div className="flex items-start gap-4">
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="flex-shrink-0"
        >
          <svg
            className="w-12 h-12 text-blood-500"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
        </motion.div>

        {/* Error Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-blood-500 mb-2 font-creepy">
            Error
          </h3>
          <p className="text-gray-300 mb-4 break-words">
            {errorMessage}
          </p>

          {/* Retry Button */}
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blood-700 hover:bg-blood-600 text-white font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blood-500 focus:ring-offset-2 focus:ring-offset-darkness-800"
              style={{ boxShadow: '0 0 15px rgba(220, 20, 60, 0.4)' }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Try Again
            </button>
          )}
        </div>
      </div>

      {/* Development Error Details */}
      {import.meta.env.DEV && (
        <details className="mt-4 pt-4 border-t border-blood-900">
          <summary className="text-gray-500 text-sm cursor-pointer hover:text-gray-400 font-mono">
            Technical Details
          </summary>
          <pre className="mt-2 text-xs text-gray-500 font-mono overflow-auto p-2 bg-darkness-900 rounded">
            {error.stack || error.message}
          </pre>
        </details>
      )}
    </motion.div>
  );
};

export default ErrorMessage;
