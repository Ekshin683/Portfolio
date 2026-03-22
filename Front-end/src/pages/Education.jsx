import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { educationAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import SecurityModal from '../components/SecurityModal';
import '../pages/Projects.css';

const Education = () => {
    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSecurityModal, setShowSecurityModal] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingEducation, setEditingEducation] = useState(null);
    const { isAuthenticated, clearAuth } = useAuth();

    const [formData, setFormData] = useState({
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        currentlyStudying: false,
        grade: '',
        description: '',
        logo: null,
        order: 0
    });

    useEffect(() => {
        fetchEducation();
    }, []);

    const fetchEducation = async () => {
        try {
            const response = await educationAPI.getAll();
            setEducation(response.data.data);
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
        const { name, value, type, checked, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        
        Object.keys(formData).forEach(key => {
            if (key === 'logo' && formData[key]) {
                data.append('logo', formData[key]);
            } else if (formData[key] !== null && formData[key] !== '') {
                data.append(key, formData[key]);
            }
        });

        try {
            if (editingEducation) {
                await educationAPI.update(editingEducation._id, data);
            } else {
                await educationAPI.create(data);
            }
            fetchEducation();
            resetForm();
            clearAuth(); // Clear authentication after successful operation
        } catch (error) {
            console.error('Error saving education:', error);
            alert(error.response?.data?.message || 'Failed to save education');
        }
    };

    const handleEdit = (edu) => {
        setEditingEducation(edu);
        setFormData({
            institution: edu.institution,
            degree: edu.degree,
            field: edu.field,
            startDate: edu.startDate ? new Date(edu.startDate).toISOString().split('T')[0] : '',
            endDate: edu.endDate ? new Date(edu.endDate).toISOString().split('T')[0] : '',
            currentlyStudying: edu.currentlyStudying || false,
            grade: edu.grade || '',
            description: edu.description || '',
            logo: null,
            order: edu.order || 0
        });
        setShowAddForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this education record?')) {
            try {
                await educationAPI.delete(id);
                fetchEducation();
                clearAuth(); // Clear authentication after successful deletion
            } catch (error) {
                console.error('Error deleting education:', error);
                alert('Failed to delete education');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            institution: '',
            degree: '',
            field: '',
            startDate: '',
            endDate: '',
            currentlyStudying: false,
            grade: '',
            description: '',
            logo: null,
            order: 0
        });
        setEditingEducation(null);
        setShowAddForm(false);
    };

    if (loading) return <div className="page-container"><div className="loading glass">Loading...</div></div>;

    return (
        <div className="page-container">
            <div className="container">
                <div className="page-header">
                    <h1 className="section-heading">Education</h1>
                    {!showAddForm && (
                        <button className="btn btn-primary" onClick={handleAddClick}>
                            Add Education
                        </button>
                    )}
                </div>

                {showAddForm && (
                    <motion.div 
                        className="add-form glass"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h2>{editingEducation ? 'Edit Education' : 'Add New Education'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <input
                                    type="text"
                                    name="institution"
                                    placeholder="Institution *"
                                    value={formData.institution}
                                    onChange={handleInputChange}
                                    className="input-glass"
                                    required
                                />
                                <input
                                    type="text"
                                    name="degree"
                                    placeholder="Degree *"
                                    value={formData.degree}
                                    onChange={handleInputChange}
                                    className="input-glass"
                                    required
                                />
                                <input
                                    type="text"
                                    name="field"
                                    placeholder="Field of Study *"
                                    value={formData.field}
                                    onChange={handleInputChange}
                                    className="input-glass"
                                    required
                                />
                                <input
                                    type="date"
                                    name="startDate"
                                    placeholder="Start Date *"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                    className="input-glass"
                                    required
                                />
                                <input
                                    type="date"
                                    name="endDate"
                                    placeholder="End Date"
                                    value={formData.endDate}
                                    onChange={handleInputChange}
                                    className="input-glass"
                                    disabled={formData.currentlyStudying}
                                />
                                <input
                                    type="text"
                                    name="grade"
                                    placeholder="Grade/GPA"
                                    value={formData.grade}
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
                                placeholder="Description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="input-glass"
                                rows="4"
                                style={{width: '100%', marginBottom: '20px'}}
                            />
                            <div className="file-input-container" style={{marginBottom: '20px'}}>
                                <label className="file-label">
                                    <input
                                        type="file"
                                        name="logo"
                                        accept="image/*"
                                        onChange={handleInputChange}
                                        style={{display: 'none'}}
                                    />
                                    {formData.logo ? formData.logo.name : 'Choose Institution Logo'}
                                </label>
                            </div>
                            <label className="checkbox-label" style={{marginBottom: '20px', display: 'block'}}>
                                <input
                                    type="checkbox"
                                    name="currentlyStudying"
                                    checked={formData.currentlyStudying}
                                    onChange={handleInputChange}
                                />
                                Currently Studying Here
                            </label>
                            <div className="form-buttons">
                                <button type="button" onClick={resetForm} className="btn btn-glass">
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editingEducation ? 'Update' : 'Add'} Education
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}

                <div className="projects-grid">
                    {education.length === 0 ? (
                        <div className="empty-state glass">
                            <p>No education records yet.</p>
                        </div>
                    ) : (
                        education.map((edu, index) => (
                            <motion.div 
                                key={edu._id} 
                                className="project-card glass"
                                initial={{opacity: 0, y: 20}} 
                                animate={{opacity: 1, y: 0}} 
                                transition={{delay: index * 0.1}}
                            >
                                {edu.logo && (
                                    <img 
                                        src={`http://localhost:5000${edu.logo}`} 
                                        alt={edu.institution}
                                        style={{width: '80px', height: '80px', objectFit: 'contain', marginBottom: '15px'}}
                                    />
                                )}
                                <h3>{edu.degree}</h3>
                                <h4 style={{color: '#f59e0b', marginBottom: '10px'}}>{edu.institution}</h4>
                                <p style={{marginBottom: '10px'}}><strong>Field:</strong> {edu.field}</p>
                                <p className="project-description">{edu.description}</p>
                                <p style={{fontSize: '0.9rem', marginTop: '10px'}}>
                                    {new Date(edu.startDate).toLocaleDateString()} - {
                                        edu.currentlyStudying ? 'Present' : 
                                        edu.endDate ? new Date(edu.endDate).toLocaleDateString() : 'N/A'
                                    }
                                </p>
                                {edu.grade && <p style={{marginTop: '5px'}}><strong>Grade:</strong> {edu.grade}</p>}
                                
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
        </div>
    );
};

export default Education;
