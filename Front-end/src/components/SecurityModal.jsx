import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './SecurityModal.css';

const SecurityModal = ({ isOpen, onClose, onSuccess }) => {
    const [securityKey, setSecurityKey] = useState('');
    const [showSecurityKey, setShowSecurityKey] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await authAPI.verifySecurityKey(securityKey);
            if (response.data.success) {
                login(response.data.token);
                setSecurityKey('');
                setShowSecurityKey(false);
                onSuccess();
                onClose();
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid security key');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div 
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div 
                    className="modal-content glass"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2>🔐 Security Verification</h2>
                    <p>Enter your security key to proceed</p>

                    <form onSubmit={handleSubmit}>
                        <div className="password-input-wrapper">
                            <input
                                type={showSecurityKey ? 'text' : 'password'}
                                className="input-glass"
                                placeholder="Enter security key"
                                value={securityKey}
                                onChange={(e) => setSecurityKey(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="eye-toggle-btn"
                                onClick={() => setShowSecurityKey((prev) => !prev)}
                                tabIndex={-1}
                                aria-label={showSecurityKey ? 'Hide security key' : 'Show security key'}
                            >
                                {showSecurityKey ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                                        <line x1="1" y1="1" x2="23" y2="23"/>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                        <circle cx="12" cy="12" r="3"/>
                                    </svg>
                                )}
                            </button>
                        </div>

                        {error && (
                            <motion.div 
                                className="error-message"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {error}
                            </motion.div>
                        )}

                        <div className="modal-buttons">
                            <button 
                                type="button" 
                                className="btn btn-glass"
                                onClick={onClose}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? 'Verifying...' : 'Verify'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SecurityModal;
