import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { skillsAPI } from '../services/api';
import { getAssetUrl } from '../services/urls';
import { useAuth } from '../context/AuthContext';
import SecurityModal from '../components/SecurityModal';
import '../pages/Projects.css';

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSecurityModal, setShowSecurityModal] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);
    const { isAuthenticated, clearAuth } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        category: 'frontend',
        icon: null,
        order: 0
    });

    const categories = ['frontend', 'backend', 'database', 'tools', 'soft-skills', 'Programming Languages', 'others'];

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const response = await skillsAPI.getAll();
            setSkills(response.data.data);
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
            if (key === 'icon' && formData[key]) {
                data.append('icon', formData[key]);
            } else if (formData[key] !== null && formData[key] !== '') {
                data.append(key, formData[key]);
            }
        });

        try {
            if (editingSkill) {
                await skillsAPI.update(editingSkill._id, data);
            } else {
                await skillsAPI.create(data);
            }
            fetchSkills();
            resetForm();
            clearAuth(); // Clear authentication after successful operation
        } catch (error) {
            console.error('Error saving skill:', error);
            alert(error.response?.data?.message || 'Failed to save skill');
        }
    };

    const handleEdit = (skill) => {
        setEditingSkill(skill);
        setFormData({
            name: skill.name,
            category: skill.category,
            icon: null,
            order: skill.order || 0
        });
        setShowAddForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this skill?')) {
            try {
                await skillsAPI.delete(id);
                fetchSkills();
                clearAuth(); // Clear authentication after successful deletion
            } catch (error) {
                console.error('Error deleting skill:', error);
                alert('Failed to delete skill');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            category: 'frontend',
            icon: null,
            order: 0
        });
        setEditingSkill(null);
        setShowAddForm(false);
    };

    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
    }, {});

    if (loading) return <div className="page-container"><div className="loading glass">Loading...</div></div>;

    return (
        <div className="page-container">
            <div className="container">
                <div className="page-header">
                    <h1 className="section-heading">Skills</h1>
                    {!showAddForm && (
                        <button className="btn btn-primary" onClick={handleAddClick}>
                            Add Skill
                        </button>
                    )}
                </div>

                {showAddForm && (
                    <motion.div 
                        className="add-form glass"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h2>{editingSkill ? 'Edit Skill' : 'Add New Skill'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Skill Name *"
                                    value={formData.name}
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
                                    type="number"
                                    name="order"
                                    placeholder="Display Order"
                                    value={formData.order}
                                    onChange={handleInputChange}
                                    className="input-glass"
                                />
                            </div>
                            <div className="file-input-container" style={{marginBottom: '20px'}}>
                                <label className="file-label">
                                    <input
                                        type="file"
                                        name="icon"
                                        accept="image/*"
                                        onChange={handleInputChange}
                                        style={{display: 'none'}}
                                    />
                                    {formData.icon ? formData.icon.name : 'Choose Skill Icon (Optional)'}
                                </label>
                            </div>
                            <div className="form-buttons">
                                <button type="button" onClick={resetForm} className="btn btn-glass">
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editingSkill ? 'Update' : 'Add'} Skill
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}

                {Object.keys(groupedSkills).length === 0 ? (
                    <div className="empty-state glass">
                        <p>No skills added yet.</p>
                    </div>
                ) : (
                    Object.entries(groupedSkills).map(([category, categorySkills]) => (
                        <div key={category} style={{marginBottom: '50px'}}>
                            <h2 style={{textTransform: 'capitalize', marginBottom: '30px'}}>{category}</h2>
                            <div className="projects-grid">
                                {categorySkills.map((skill, index) => (
                                    <motion.div key={skill._id} className="card" initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} transition={{delay: index * 0.05}}>
                                        {skill.icon && (
                                            <img 
                                                src={getAssetUrl(skill.icon)} 
                                                alt={skill.name}
                                                style={{width: '48px', height: '48px', objectFit: 'contain', marginBottom: '15px'}}
                                            />
                                        )}
                                        <h3>{skill.name}</h3>
                                        <p style={{marginTop: '10px', opacity: 0.8, textTransform: 'capitalize'}}>{skill.category}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
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

export default Skills;
