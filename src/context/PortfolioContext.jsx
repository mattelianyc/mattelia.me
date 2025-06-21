import React, { createContext, useContext, useState, useEffect } from 'react';
import portfolioData from '../data/portfolio.json';

const PortfolioContext = createContext();

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(portfolioData);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedWork, setSelectedWork] = useState(null);

  const value = {
    data,
    currentPage,
    setCurrentPage,
    selectedWork,
    setSelectedWork,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}; 