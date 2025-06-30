import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Landing.css';

const LandingOld = () => {
  const navigate = useNavigate();
  const [lifeHover, setLifeHover] = useState(false);
  const [workHover, setWorkHover] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate precise second hand rotation (completes full rotation every 60 seconds)
  const getMinuteHandRotation = () => {
    const seconds = currentTime.getSeconds();
    const milliseconds = currentTime.getMilliseconds();
    // 360 degrees / 60 seconds = 6 degrees per second
    // Add milliseconds for ultra-smooth movement: (milliseconds / 1000) * 6
    return (seconds * 6) + (milliseconds * 0.006);
  };

  // Calculate clip-path based on minute hand angle
  const getClipPaths = () => {
    const angle = getMinuteHandRotation();
    // Normalize angle to 0-360 range
    const normalizedAngle = ((angle % 360) + 360) % 360;
    
    // Calculate the percentage of the current MINUTE (seconds 0-59) that has passed (0-100%)
    const progress = normalizedAngle / 360 * 100;
    
    // Convert angle to radians for calculation (starting from 12 o'clock)
    const radians = (normalizedAngle - 90) * (Math.PI / 180);
    
    // Calculate end point of the minute hand line from center to edge
    const centerX = 50;
    const centerY = 50;
    
    const dx = Math.cos(radians);
    const dy = Math.sin(radians);
    
    // Find intersection with viewport edge
    let endX = centerX;
    let endY = centerY;
    
    // Calculate intersection with viewport boundaries
    const tTop = dy < 0 ? -centerY / dy : Infinity;
    const tBottom = dy > 0 ? (100 - centerY) / dy : Infinity;
    const tLeft = dx < 0 ? -centerX / dx : Infinity;
    const tRight = dx > 0 ? (100 - centerX) / dx : Infinity;
    
    const t = Math.min(tTop, tBottom, tLeft, tRight);
    if (t !== Infinity) {
      endX = centerX + dx * t;
      endY = centerY + dy * t;
    }
    
    // Clamp to viewport bounds
    endX = Math.max(0, Math.min(100, endX));
    endY = Math.max(0, Math.min(100, endY));
    
    // Work section covers full screen, black mask covers the elapsed area
    const workClipPath = `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`;
    
    let blackMaskClipPath;
    if (normalizedAngle <= 90) {
      // First quadrant (0-15 seconds) - mirror fourth quadrant pattern
      blackMaskClipPath = `polygon(50% 50%, 50% 0%, ${endX}% 0%, ${endX}% ${endY}%)`;
    } else if (normalizedAngle <= 180) {
      // Second quadrant (15-30 seconds) - mirror third quadrant pattern  
      blackMaskClipPath = `polygon(50% 50%, 50% 0%, 100% 0%, 100% ${endY}%, ${endX}% ${endY}%)`;
    } else if (normalizedAngle <= 270) {
      // Third quadrant (30-45 seconds) - cover top, right, and bottom to hand
      blackMaskClipPath = `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, ${endX}% 100%, ${endX}% ${endY}%)`;
    } else {
      // Fourth quadrant (45-60 seconds) - cover top, right, bottom, and left to hand
      blackMaskClipPath = `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% ${endY}%, ${endX}% ${endY}%)`;
    }
    
    return { workClipPath, blackMaskClipPath, endX, endY, progress };
  };

  const { workClipPath, blackMaskClipPath, endX, endY, progress } = getClipPaths();

  const handleLifeClick = () => {
    navigate('/life');
  };

  const handleWorkClick = () => {
    navigate('/work');
  };

  const splitVariants = {
    initial: { 
      clipPath: "polygon(0 0, 0 0, 0 0)",
      opacity: 0
    },
    animate: { 
      clipPath: "polygon(0 0, 100% 0, 0 100%)",
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const workSplitVariants = {
    initial: { 
      clipPath: "polygon(100% 100%, 100% 100%, 100% 100%)",
      opacity: 0
    },
    animate: { 
      clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.1
      }
    }
  };

  const contentVariants = {
    initial: { 
      y: 30,
      opacity: 0,
      scale: 0.9
    },
    animate: { 
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.8,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = {
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="landing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Work Section - Full Screen Background */}
      <motion.div 
        className="split-section work-section"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          clipPath: workClipPath
        }}
        transition={{
          opacity: { duration: 0.5 },
          clipPath: { duration: 0.5, ease: "easeInOut" }
        }}
        whileHover="hover"
        onMouseEnter={() => setWorkHover(true)}
        onMouseLeave={() => setWorkHover(false)}
        onClick={handleWorkClick}
      >
        <video 
          className="work-video"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/video/skyline.mp4" type="video/mp4" />
        </video>
        
        <motion.div 
          className={`overlay work-overlay ${workHover ? 'hovered' : ''}`}
          animate={{
            backgroundColor: workHover 
              ? 'rgba(0, 0, 0, 0.1)' 
              : 'rgba(0, 0, 0, 0.2)'
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Black Mask for Elapsed Time */}
      <motion.div 
        className="black-mask"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          clipPath: blackMaskClipPath,
          backgroundColor: lifeHover ? '#fff' : '#000'
        }}
        transition={{
          opacity: { duration: 0.5 },
          clipPath: { duration: 0.5, ease: "easeInOut" },
          backgroundColor: { duration: 0.3, ease: "easeOut" }
        }}
        onMouseEnter={() => setLifeHover(true)}
        onMouseLeave={() => setLifeHover(false)}
        onClick={handleLifeClick}
      >
      </motion.div>

      {/* Center Clock Dot */}
      <div className="center-clock-dot" />

      {/* Dynamic Center Label - Yin Yang Style */}
      <motion.div 
        className="center-label"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1,
          scale: 1
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.span
          key={lifeHover ? 'life' : workHover ? 'work' : 'initials'}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`label-text ${lifeHover ? 'life-label' : workHover ? 'work-label' : 'initials-label'}`}
        >
          {lifeHover ? 'life' : workHover ? 'work' : 'm.e.'}
        </motion.span>
      </motion.div>

      {/* Artist Signature */}
      <div className="artist-signature">m.e.</div>
    </motion.div>
  );
};

export default LandingOld; 