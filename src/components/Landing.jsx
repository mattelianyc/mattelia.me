import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import portfolioData from '../data/portfolio.json';
import './NewLanding.css';

const Landing = () => {
  const navigate = useNavigate();
  const [lifeHover, setLifeHover] = useState(false);
  const [workHover, setWorkHover] = useState(false);
  const [videosLoaded, setVideosLoaded] = useState({ life: false, work: false });
  
  const { personal } = portfolioData;

  const handleLifeClick = () => {
    navigate('/life');
  };

  const handleWorkClick = () => {
    navigate('/work');
  };

  const handleVideoLoad = (videoType) => {
    setVideosLoaded(prev => ({ ...prev, [videoType]: true }));
  };

  const handleVideoError = (videoType) => {
    console.warn(`Video ${videoType} failed to load`);
  };

  // Handle touch events for mobile
  const handleTouchStart = (setHover) => {
    setHover(true);
  };

  const handleTouchEnd = (setHover) => {
    setTimeout(() => setHover(false), 100);
  };

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'github':
        return (
          <svg viewBox="0 0 24 24" className="footer-link-icon">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        );
      case 'email':
        return (
          <svg viewBox="0 0 24 24" className="footer-link-icon">
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'linkedin':
        return (
          <svg viewBox="0 0 24 24" className="footer-link-icon">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className="new-landing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Section */}
      <motion.header 
        className="landing-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className="name">{personal.nickname}</h1>
        <p className="title">{personal.title}</p>
        {/* <p className="location">{personal.location}</p> */}
      </motion.header>

      {/* Split Screen Video Section */}
      <div className="split-container">
        {/* Work Section */}
        <motion.div 
          className={`split-section work-split ${workHover ? 'hovered' : ''}`}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onMouseEnter={() => setWorkHover(true)}
          onMouseLeave={() => setWorkHover(false)}
          onTouchStart={() => handleTouchStart(setWorkHover)}
          onTouchEnd={() => handleTouchEnd(setWorkHover)}
          onClick={handleWorkClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <video 
            className={`split-video ${videosLoaded.work ? 'is-loaded' : 'is-loading'}`}
            autoPlay 
            muted 
            loop 
            playsInline
            preload="metadata"
            onLoadedData={() => handleVideoLoad('work')}
            onError={() => handleVideoError('work')}
          >
            <source src="/video/skyline.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          <div className="split-overlay">
            <motion.div 
              className="split-content"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h2 className="split-title">work</h2>
              {/* <p className="split-subtitle">professional portfolio</p> */}
            </motion.div>
          </div>
        </motion.div>

           {/* Life Section */}
           <motion.div 
          className={`split-section life-split ${lifeHover ? 'hovered' : ''}`}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onMouseEnter={() => setLifeHover(true)}
          onMouseLeave={() => setLifeHover(false)}
          onTouchStart={() => handleTouchStart(setLifeHover)}
          onTouchEnd={() => handleTouchEnd(setLifeHover)}
          onClick={handleLifeClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <video 
            className={`split-video ${videosLoaded.life ? 'is-loaded' : 'is-loading'}`}
            autoPlay 
            muted 
            loop 
            playsInline
            preload="metadata"
            onLoadedData={() => handleVideoLoad('life')}
            onError={() => handleVideoError('life')}
          >
            <source src="/video/waves.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          <div className="split-overlay">
            <motion.div 
              className="split-content"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h2 className="split-title">life</h2>
              {/* <p className="split-subtitle">personal journey</p> */}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Links Section */}
      <motion.footer 
        className="landing-footer"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="links-container">
          {personal.links.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              className="footer-link"
              target={link.name !== 'Email' ? '_blank' : undefined}
              rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {renderIcon(link.icon)}
              <span className="footer-link-text">{link.name}</span>
            </motion.a>
          ))}
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default Landing; 