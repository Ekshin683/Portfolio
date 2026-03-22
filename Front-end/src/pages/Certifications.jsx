import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certificationsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import SecurityModal from '../components/SecurityModal';
import '../pages/Projects.css';

const Certifications = () => {
    const [certifications, setCertifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSecurityModal, setShowSecurityModal] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingCertification, setEditingCertification] = useState(null);
    const [selectedCertification, setSelectedCertification] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const { isAuthenticated, clearAuth } = useAuth();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        organization: '',
        image: null,
        certificateLink: '',
        order: 0
    });

    useEffect(() => {
        fetchCertifications();
    }, []);

    const fetchCertifications = async () => {
        try {
            const response = await certificationsAPI.getAll();
            const certifications = response.data.data || [];
            setCertifications(certifications);
        } catch (error) {
            console.error('Error fetching certifications:', error);
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
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('date', formData.date);
        data.append('organization', formData.organization);
        data.append('certificateLink', formData.certificateLink);
        data.append('order', formData.order || 0);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            if (editingCertification) {
                await certificationsAPI.update(editingCertification._id, data);
            } else {
                await certificationsAPI.create(data);
            }
            await fetchCertifications();
            resetForm();
            clearAuth();
        } catch (error) {
            console.error('Error saving certification:', error);
            alert(error.response?.data?.message || 'Failed to save certification');
        }
    };

    const handleEdit = (certification) => {
        setEditingCertification(certification);
        setFormData({
            title: certification.title,
            description: certification.description,
            date: certification.date ? new Date(certification.date).toISOString().split('T')[0] : '',
            organization: certification.organization || '',
            image: null,
            certificateLink: certification.certificateLink || '',
            order: certification.order || 0
        });
        setShowAddForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this certification?')) {
            try {
                await certificationsAPI.delete(id);
                await fetchCertifications();
                clearAuth();
            } catch (error) {
                console.error('Error deleting certification:', error);
                alert('Failed to delete certification');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            date: '',
            organization: '',
            image: null,
            certificateLink: '',
            order: 0
        });
        setEditingCertification(null);
        setShowAddForm(false);
    };

    if (loading) {
        return (
            <div className="page-container">
                <div className="loading glass">Loading...</div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="container">
                <div className="page-header">
                    <h1 className="section-heading">Certifications</h1>
                    {!showAddForm && (
                        <button className="btn btn-primary" onClick={handleAddClick}>
                            Add Certification
                        </button>
                    )}
                </div>

                {showAddForm && (
                    <motion.div
                        className="add-form glass"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h2>{editingCertification ? 'Edit Certification' : 'Add New Certification'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Certification Title *"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="input-glass"
                                    required
                                />
                                <input
                                    type="text"
                                    name="organization"
                                    placeholder="Issuing Organization"
                                    value={formData.organization}
                                    onChange={handleInputChange}
                                    className="input-glass"
                                />
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    className="input-glass"
                                    required
                                />
                                <input
                                    type="url"
                                    name="certificateLink"
                                    placeholder="Certificate Link"
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
                                style={{ width: '100%', marginBottom: '20px' }}
                                required
                            />

                            <div className="file-input-container" style={{ marginBottom: '20px' }}>
                                <label className="file-label">
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleInputChange}
                                        style={{ display: 'none' }}
                                    />
                                    {formData.image ? formData.image.name : 'Choose Certification Image (Optional)'}
                                </label>
                            </div>

                            <div className="form-buttons">
                                <button type="button" onClick={resetForm} className="btn btn-glass">
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editingCertification ? 'Update' : 'Add'} Certification
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}

                <div className="projects-grid">
                    {certifications.length === 0 ? (
                        <div className="empty-state glass">
                            <p>No certifications added yet.</p>
                        </div>
                    ) : (
                        certifications.map((certification, index) => (
                            <motion.div
                                key={certification._id}
                                className="project-card glass"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.08 }}
                                onClick={() => {
                                    setSelectedCertification(certification);
                                    setShowDetailModal(true);
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                <h3>{certification.title}</h3>
                                {certification.organization && (
                                    <p style={{ marginTop: '8px', marginBottom: '12px' }}><strong>{certification.organization}</strong></p>
                                )}
                                <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>
                                    {new Date(certification.date).toLocaleDateString()}
                                </p>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>

            <AnimatePresence>
                {showDetailModal && selectedCertification && (
                    <motion.div
                        className="project-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowDetailModal(false)}
                    >
                        <motion.div
                            className="project-modal-content glass"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="modal-close"
                                onClick={() => setShowDetailModal(false)}
                            >
                                ×
                            </button>

                            <div className="project-modal-body">
                                <div className="project-modal-header">
                                    <h2>{selectedCertification.title}</h2>
                                </div>

                                {selectedCertification.organization && (
                                    <p style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#e0e0e0' }}>
                                        <strong>Organization:</strong> {selectedCertification.organization}
                                    </p>
                                )}

                                {selectedCertification.date && (
                                    <p style={{ fontSize: '0.95rem', marginBottom: '15px', color: '#a0a0a0' }}>
                                        <strong>Date:</strong> {new Date(selectedCertification.date).toLocaleDateString()}
                                    </p>
                                )}

                                <p className="project-description" style={{ marginTop: '20px', lineHeight: '1.6', color: '#d0d0d0' }}>
                                    {selectedCertification.description}
                                </p>

                                {selectedCertification.certificateLink && (
                                    <a
                                        href={selectedCertification.certificateLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary"
                                        style={{ marginTop: '20px', display: 'inline-block' }}
                                    >
                                        View Certificate
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {showSecurityModal && (
                <SecurityModal
                    isOpen={showSecurityModal}
                    onClose={() => setShowSecurityModal(false)}
                    onSuccess={handleSecuritySuccess}
                />
            )}
        </div>
    );
};

export default Certifications;
