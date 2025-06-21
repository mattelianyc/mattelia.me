import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import './Work.css';

const Work = () => {
  const navigate = useNavigate();
  const { data } = usePortfolio();
  const { work } = data;
  const [selectedClient, setSelectedClient] = useState(null);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleClientClick = (client) => {
    setSelectedClient(client);
  };

  const handleCloseModal = () => {
    setSelectedClient(null);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: { opacity: 0, y: -20 }
  };

  const headerVariants = {
    initial: { opacity: 0, y: -30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const gridVariants = {
    animate: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -15,
      scale: 1.02,
      rotateY: 5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div 
      className="work-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.button 
        className="back-button" 
        onClick={handleBackClick}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        ← back
      </motion.button>
      
      <div className="work-content">
        <motion.div 
          className="work-header"
          variants={headerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            work
          </motion.h1>
          <motion.p 
            className="tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {work.tagline}
          </motion.p>
        </motion.div>

        <motion.div 
          className="clients-grid"
          variants={gridVariants}
          initial="initial"
          animate="animate"
        >
          {work.clients.map((client, index) => (
            <motion.div 
              key={client.id}
              className="client-card"
              variants={cardVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              onClick={() => handleClientClick(client)}
              style={{
                perspective: "1000px",
                backgroundImage: `url(${client.logo})`
              }}
            >
              {/* <motion.div 
                className="client-info"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.h3
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {client.name}
                </motion.h3>
                <motion.span 
                  className="year"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {client.year}
                </motion.span>
              </motion.div> */}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedClient && (
          <motion.div 
            className="modal-overlay" 
            onClick={handleCloseModal}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div 
              className="modal-content" 
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.button 
                className="close-button" 
                onClick={handleCloseModal}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 90
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                ×
              </motion.button>
              
              <motion.div 
                className="modal-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <motion.div 
                  className="modal-logo"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                >
                  <img src={selectedClient.logo} alt={selectedClient.name} />
                </motion.div>
                <div className="modal-title">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    {selectedClient.name}
                  </motion.h2>
                  <motion.span 
                    className="modal-year"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                  >
                    {selectedClient.year}
                  </motion.span>
                </div>
              </motion.div>
              
              <motion.div 
                className="modal-body"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <motion.p 
                  className="project-description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {selectedClient.description}
                </motion.p>
                
                <motion.div 
                  className="technologies"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <h4>Technologies Used</h4>
                  <motion.div 
                    className="tech-tags"
                    variants={{
                      animate: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.6
                        }
                      }
                    }}
                    initial="initial"
                    animate="animate"
                  >
                    {selectedClient.technologies.map((tech, index) => (
                      <motion.span 
                        key={index} 
                        className="tech-tag"
                        variants={{
                          initial: { opacity: 0, scale: 0.5 },
                          animate: { 
                            opacity: 1, 
                            scale: 1,
                            transition: {
                              duration: 0.3,
                              ease: "easeOut"
                            }
                          }
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          y: -2,
                          transition: { duration: 0.2 }
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Work; 