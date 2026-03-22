import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const { isAuthenticated, logout } = useAuth();

    // Monitor if modal is open (body overflow hidden)
    useEffect(() => {
        const checkModalState = () => {
            const isHidden = document.body.style.overflow === 'hidden';
            setIsModalOpen(isHidden);
        };

        // Check on mount and listen for changes
        checkModalState();
        const interval = setInterval(checkModalState, 100);

        return () => clearInterval(interval);
    }, []);

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/projects', label: 'Projects' },
        { path: '/resume', label: 'Resume' },
        { path: '/education', label: 'Education' },
        { path: '/achievements', label: 'Achievements' },
        { path: '/certifications', label: 'Certifications' },
        { path: '/skills', label: 'Skills' },
        { path: '/contact', label: 'Contact' }
    ];

    // Hide navbar when modal is open
    if (isModalOpen) {
        return null;
    }

    return (
        <motion.nav 
            className="navbar glass"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container">
                <div className="nav-content">
                    <Link to="/" className="logo">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Ekshindeep
                        </motion.div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="nav-links desktop-menu">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                            >
                                <motion.span
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {link.label}
                                </motion.span>
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="nav-actions">
                        <Link to="/contact" className="btn-hire">
                            Hire Me
                        </Link>
                        {isAuthenticated && (
                            <button onClick={logout} className="btn btn-glass btn-sm">
                                Logout
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button 
                        className="mobile-menu-toggle"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <motion.div 
                        className="mobile-menu glass"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        {isAuthenticated && (
                            <button 
                                onClick={() => {
                                    logout();
                                    setIsMenuOpen(false);
                                }} 
                                className="btn btn-glass w-full"
                            >
                                Logout
                            </button>
                        )}
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
};

export default Navbar;
