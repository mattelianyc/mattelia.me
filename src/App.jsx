import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { PortfolioProvider } from './context/PortfolioContext';
import Landing from './components/Landing';
import Life from './components/Life';
import Work from './components/Work';
import './App.css';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/life" element={<Life />} />
        <Route path="/work" element={<Work />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <PortfolioProvider>
      <Router>
        <div className="App">
          <AnimatedRoutes />
        </div>
      </Router>
    </PortfolioProvider>
  );
}

export default App;
