import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { achievementsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import SecurityModal from '../components/SecurityModal';
import '../pages/Projects.css';

const Achievements = () => {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSecurityModal, setShowSecurityModal] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingAchievement, setEditingAchievement] = useState(null);
    const [selectedAchievement, setSelectedAchievement] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const { isAuthenticated, clearAuth } = useAuth();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        category: 'award',
        organization: '',
        image: null,
        certificateLink: '',
        order: 0
    });

    const categories = ['award', 'certification', 'competition', 'publication', 'other'];

    useEffect(() => {
        fetchAchievements();
    }, []);

    // Manage body overflow when modal opens
    useEffect(() => {
        if (!showDetailModal) return;

        const { body } = document;
        const previousOverflow = body.style.overflow;
        body.style.overflow = 'hidden';

        return () => {
            body.style.overflow = previousOverflow;
        };
    }, [showDetailModal]);

    const fetchAchievements = async () => {
        try {
            const response = await achievementsAPI.getAll();
            setAchievements(response.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddClick = () => {
        setShowSecurityModal(true);
    };

    const handleSecuritySuccess = () => {
        setShowAddForm(true);
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        
        Object.keys(formData).forEach(key => {
            if (key === 'image' && formData[key]) {
                data.append('image', formData[key]);
            } else if (formData[key] !== null && formData[key] !== '') {
                data.append(key, formData[key]);
            }
        });

        try {
            if (editingAchievement) {
                await achievementsAPI.update(editingAchievement._id, data);
            } else {
                await achievementsAPI.create(data);
            }
            fetchAchievements();
            resetForm();
            clearAuth(); // Clear authentication after successful operation
        } catch (error) {
            console.error('Error saving achievement:', error);
            alert(error.response?.data?.message || 'Failed to save achievement');
        }
    };

    const handleEdit = (achievement) => {
        setEditingAchievement(achievement);
        setFormData({
            title: achievement.title,
            description: achievement.description,
            date: achievement.date ? new Date(achievement.date).toISOString().split('T')[0] : '',
            category: achievement.category,
            organization: achievement.organization || '',
            image: null,
            certificateLink: achievement.certificateLink || '',
            order: achievement.order || 0
        });
        setShowAddForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this achievement?')) {
            try {
                await achievementsAPI.delete(id);
                fetchAchievements();
                clearAuth(); // Clear authentication after successful deletion
            } catch (error) {
                console.error('Error deleting achievement:', error);
                alert('Failed to delete achievement');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            date: '',
            category: 'award',
            organization: '',
            image: null,
            certificateLink: '',
            order: 0
        });
        setEditingAchievement(null);
        setShowAddForm(false);
    };

    if (loading) return <div className="page-container"><div className="loading glass">Loading...</div></div>;

    return (
        <div className="page-container">
            <div className="container">
                <div className="page-header">
                    <h1 className="section-heading">Achievements</h1>
                    {!showAddForm && (
                        <button className="btn btn-primary" onClick={handleAddClick}>
                            Add Achievement
                        </button>
                    )}
                </div>

                {showAddForm && (
                    <motion.div 
                        className="add-form glass"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h2>{editingAchievement ? 'Edit Achievement' : 'Add New Achievement'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Achievement Title *"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="input-glass"
                                    required
                                />
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="input-glass"
                                    required
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    name="organization"
                                    placeholder="Organization"
                                    value={formData.organization}
                                    onChange={handleInputChange}
                                    className="input-glass"
                                />
                                <input
                                    type="date"
                                    name="date"
                                    placeholder="Date *"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    className="input-glass"
                                    required
                                />
                                <input
                                    type="url"
                                    name="certificateLink"
                                    placeholder="Certificate Link (optional)"
                                    value={formData.certificateLink}
                                    onChange={handleInputChange}
                                    className="input-glass"
                                />
                                <input
                                    type="number"
                                    name="order"
                                    placeholder="Display Order"
                                    value={formData.order}
                                    onChange={handleInputChange}
                                    className="input-glass"
                                />
                            </div>
                            <textarea
                                name="description"
                                placeholder="Description *"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="input-glass"
                                rows="4"
                                style={{width: '100%', marginBottom: '20px'}}
                                required
                            />
                            <div className="file-input-container" style={{marginBottom: '20px'}}>
                                <label className="file-label">
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleInputChange}
                                        style={{display: 'none'}}
                                    />
                                    {formData.image ? formData.image.name : 'Choose Achievement Image (Optional)'}
                                </label>
                            </div>
                            <div className="form-buttons">
                                <button type="button" onClick={resetForm} className="btn btn-glass">
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editingAchievement ? 'Update' : 'Add'} Achievement
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}

                <div className="projects-grid">
                    {achievements.length === 0 ? (
                        <div className="empty-state glass">
                            <p>No achievements yet.</p>
                        </div>
                    ) : (
                        achievements.map((achievement, index) => (
                            <motion.div
                                key={achievement._id}
                                className="card"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: index * 0.1}}
                                onClick={() => {
                                    setSelectedAchievement(achievement);
                                    setShowDetailModal(true);
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                <h3>{achievement.title}</h3>
                                <span className="badge">{achievement.category}</span>
                                {achievement.organization && <p style={{marginTop: '10px'}}><strong>{achievement.organization}</strong></p>}
                                <p style={{marginTop: '10px', fontSize: '0.9rem'}}>{new Date(achievement.date).toLocaleDateString()}</p>
                                {achievement.certificateLink && (
                                    <a href={achievement.certificateLink} target="_blank" rel="noopener noreferrer" className="btn btn-glass" style={{marginTop: '10px', display: 'inline-block'}} onClick={(e) => e.stopPropagation()}>
                                        View Certificate
                                    </a>
                                )}
                            </motion.div>
                        ))
                    )}
                </div>
            </div>

            {showSecurityModal && (
                <SecurityModal
                    isOpen={showSecurityModal}
                    onClose={() => setShowSecurityModal(false)}
                    onSuccess={handleSecuritySuccess}
                />
            )}

            <AnimatePresence>
                {showDetailModal && selectedAchievement && (
                    <motion.div
                        className="project-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => {
                            setShowDetailModal(false);
                            setSelectedAchievement(null);
                        }}
                    >
                        <motion.div
                            className="project-modal-content glass"
                            initial={{ y: 30, opacity: 0, scale: 0.96 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="modal-close"
                                onClick={() => {
                                    setShowDetailModal(false);
                                    setSelectedAchievement(null);
                                }}
                            >
                                ×
                            </button>

                            {selectedAchievement.image && (
                                <div className="project-modal-image">
                                    <img
                                        src={`http://localhost:5000${selectedAchievement.image}`}
                                        alt={selectedAchievement.title}
                                    />
                                </div>
                            )}

                            <div className="project-modal-body">
                                <div className="project-modal-header">
                                    <h2>{selectedAchievement.title}</h2>
                                    <span className="badge">{selectedAchievement.category}</span>
                                </div>

                                {selectedAchievement.organization && (
                                    <p style={{ marginBottom: '8px', color: '#e0e0e0' }}><strong>Organization:</strong> {selectedAchievement.organization}</p>
                                )}
                                <p style={{ marginBottom: '12px', color: '#a0a0a0' }}><strong>Date:</strong> {new Date(selectedAchievement.date).toLocaleDateString()}</p>

                                <p className="project-description" style={{ marginBottom: '16px', marginTop: '20px', lineHeight: '1.6', color: '#d0d0d0' }}>
                                    {selectedAchievement.description}
                                </p>

                                {selectedAchievement.certificateLink && (
                                    <a
                                        href={selectedAchievement.certificateLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary"
                                    >
                                        View Certificate
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Achievements;
