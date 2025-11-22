import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchBar } from '../ui/SearchBar';
import { ROUTES } from '../../utils/constants';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    // Navigate to home with search query
    if (query) {
      navigate(`${ROUTES.HOME}?search=${encodeURIComponent(query)}`);
    } else {
      navigate(ROUTES.HOME);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-darkness-900/80 backdrop-blur-md border-b border-blood-900/30" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to={ROUTES.HOME}
            className="relative flex items-center space-x-2 group"
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl md:text-4xl font-creepy text-blood-500 tracking-wider">
                HORROR
                <span className="text-white">FLIX</span>
              </h1>

              {/* Blood Drip Animation on Logo Hover */}
              <AnimatePresence>
                {isLogoHovered && (
                  <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 50, opacity: [0, 1, 0.8, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: 'easeIn' }}
                    className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                  >
                    <svg
                      width="20"
                      height="60"
                      viewBox="0 0 20 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient id="bloodGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#DC143C" stopOpacity="1" />
                          <stop offset="100%" stopColor="#8B0000" stopOpacity="0.8" />
                        </linearGradient>
                      </defs>
                      <ellipse
                        cx="10"
                        cy="30"
                        rx="6"
                        ry="25"
                        fill="url(#bloodGradient)"
                      />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search Bar */}
            <div className="w-80">
              <SearchBar onSearch={handleSearch} />
            </div>

            {/* Navigation Links */}
            <Link
              to={ROUTES.HOME}
              className="text-white hover:text-blood-500 transition-colors duration-300 font-medium relative group focus:outline-none focus:ring-2 focus:ring-blood-500 focus:ring-offset-2 focus:ring-offset-darkness-900 rounded px-2 py-1"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blood-500 group-hover:w-full transition-all duration-300" aria-hidden="true" />
            </Link>

            <Link
              to={ROUTES.WATCHLIST}
              className="text-white hover:text-blood-500 transition-colors duration-300 font-medium relative group flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-blood-500 focus:ring-offset-2 focus:ring-offset-darkness-900 rounded px-2 py-1"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
              <span>Watchlist</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blood-500 group-hover:w-full transition-all duration-300" aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile Menu Button - Touch target minimum 44x44px */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-white hover:bg-darkness-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blood-500 focus:ring-offset-2 focus:ring-offset-darkness-900"
            aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-20 right-0 bottom-0 w-full sm:w-80 bg-darkness-900 border-l border-blood-900/30 md:hidden overflow-y-auto"
            role="dialog"
            aria-label="Mobile navigation menu"
          >
            <div className="p-6 space-y-6">
              {/* Mobile Search Bar */}
              <div>
                <SearchBar onSearch={handleSearch} />
              </div>

              {/* Mobile Navigation Links */}
              <nav className="space-y-4" aria-label="Mobile navigation links">
                <Link
                  to={ROUTES.HOME}
                  onClick={closeMobileMenu}
                  className="block text-white hover:text-blood-500 transition-colors duration-300 font-medium text-lg py-2 border-b border-darkness-700 focus:outline-none focus:ring-2 focus:ring-blood-500 focus:ring-offset-2 focus:ring-offset-darkness-900 rounded"
                >
                  Home
                </Link>

                <Link
                  to={ROUTES.WATCHLIST}
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-2 text-white hover:text-blood-500 transition-colors duration-300 font-medium text-lg py-2 border-b border-darkness-700 focus:outline-none focus:ring-2 focus:ring-blood-500 focus:ring-offset-2 focus:ring-offset-darkness-900 rounded"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                  <span>Watchlist</span>
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 md:hidden z-[-1]"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </nav>
  );
};
