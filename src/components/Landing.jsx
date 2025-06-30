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
            className="split-video"
            autoPlay 
            muted 
            loop 
            playsInline
            preload="metadata"
            onLoadedData={() => handleVideoLoad('work')}
            onError={() => handleVideoError('work')}
            style={{
              opacity: videosLoaded.work ? 1 : 0.7,
              transition: 'opacity 0.3s ease'
            }}
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
            className="split-video"
            autoPlay 
            muted 
            loop 
            playsInline
            preload="metadata"
            onLoadedData={() => handleVideoLoad('life')}
            onError={() => handleVideoError('life')}
            style={{
              opacity: videosLoaded.life ? 1 : 0.7,
              transition: 'opacity 0.3s ease'
            }}
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
              {link.name}
            </motion.a>
          ))}
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default Landing; 