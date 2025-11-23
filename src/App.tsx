import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WatchlistProvider } from './context/WatchlistContext';
import { Navbar, Footer } from './components/layout';
import ErrorBoundary from './components/ui/ErrorBoundary';
import Home from './pages/Home';
import MovieDetailPage from './pages/MovieDetailPage';
import Watchlist from './pages/Watchlist';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <WatchlistProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            {/* Skip to main content link for keyboard navigation */}
            <a href="#main-content" className="skip-to-main">
              Skip to main content
            </a>
            <Navbar />
            <main id="main-content" className="grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<MovieDetailPage />} />
                <Route path="/watchlist" element={<Watchlist />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </WatchlistProvider>
    </ErrorBoundary>
  );
}

export default App;
