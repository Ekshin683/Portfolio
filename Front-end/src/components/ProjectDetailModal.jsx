import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProjectDetailModal.css';

const ProjectDetailModal = ({ project, isOpen, onClose }) => {
    useEffect(() => {
        if (!isOpen) return;

        const { body } = document;
        const previousOverflow = body.style.overflow;
        body.style.overflow = 'hidden';

        return () => {
            body.style.overflow = previousOverflow;
        };
    }, [isOpen]);

    if (!isOpen || !project) return null;

    return (
        <AnimatePresence>
            <motion.div 
                className="project-modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div 
                    className="project-modal-content glass"
                    initial={{ scale: 0.5, opacity: 0, y: 100 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.5, opacity: 0, y: 100 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className="modal-close" onClick={onClose}>×</button>
                    
                    {project.image && (
                        <div className="project-modal-image">
                            <img src={`http://localhost:5000${project.image}`} alt={project.title} />
                        </div>
                    )}
                    
                    <div className="project-modal-body">
                        <div className="project-modal-header">
                            <h2>{project.title}</h2>
                            {project.featured && <span className="badge">Featured</span>}
                            <p className="project-category">{project.category}</p>
                        </div>

                        <div className="project-modal-description">
                            <h3>Description</h3>
                            <p>{project.description}</p>
                        </div>

                        {project.technologies && project.technologies.length > 0 && (
                            <div className="project-modal-tech">
                                <h3>Technologies Used</h3>
                                <div className="technologies">
                                    {project.technologies.map((tech, i) => (
                                        <span key={i} className="tech-tag-large">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="project-modal-links">
                            {project.githubLink && (
                                <a 
                                    href={project.githubLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="btn btn-primary"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                                    </svg>
                                    View on GitHub
                                </a>
                            )}
                            {project.liveLink && (
                                <a 
                                    href={project.liveLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="btn btn-glass"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                        <polyline points="15 3 21 3 21 9"></polyline>
                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                    </svg>
                                    Live Demo
                                </a>
                            )}
                        </div>

                        {(!project.githubLink && !project.liveLink) && (
                            <div className="project-no-links">
                                <p>No external links available for this project.</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProjectDetailModal;
