import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { projectsAPI } from '../services/api';
import { getAssetUrl } from '../services/urls';
import { useAuth } from '../context/AuthContext';
import SecurityModal from '../components/SecurityModal';
import ProjectDetailModal from '../components/ProjectDetailModal';
import './Projects.css';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSecurityModal, setShowSecurityModal] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const { isAuthenticated, clearAuth } = useAuth();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        technologies: '',
        image: null,
        liveLink: '',
        githubLink: '',
        category: 'web',
        featured: false
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await projectsAPI.getAll();
            setProjects(response.data.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
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
        
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('technologies', formData.technologies);
        data.append('liveLink', formData.liveLink);
        data.append('githubLink', formData.githubLink);
        data.append('category', formData.category);
        data.append('featured', formData.featured);
        
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            if (editingProject) {
                await projectsAPI.update(editingProject._id, data);
            } else {
                await projectsAPI.create(data);
            }
            fetchProjects();
            resetForm();
            clearAuth(); // Clear authentication after successful operation
        } catch (error) {
            console.error('Error saving project:', error);
            alert(error.response?.data?.message || 'Failed to save project');
        }
    };

    const handleEdit = (project) => {
        setEditingProject(project);
        setFormData({
            title: project.title,
            description: project.description,
            technologies: project.technologies.join(', '),
            image: null,
            liveLink: project.liveLink || '',
            githubLink: project.githubLink || '',
            category: project.category,
            featured: project.featured
        });
        setShowAddForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await projectsAPI.delete(id);
                fetchProjects();
                clearAuth(); // Clear authentication after successful deletion
            } catch (error) {
                console.error('Error deleting project:', error);
                alert('Failed to delete project');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            technologies: '',
            image: null,
            liveLink: '',
            githubLink: '',
            category: 'web',
            featured: false
        });
        setShowAddForm(false);
        setEditingProject(null);
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
            <motion.div 
                className="container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="page-header">
                    <h1 className="section-heading">Projects</h1>
                    {!showAddForm && (
                        <motion.button
                            className="btn btn-primary"
                            onClick={handleAddClick}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            + Add Project
                        </motion.button>
                    )}
                </div>

                {showAddForm && (
                    <motion.div 
                        className="add-form glass"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h2>{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <input
                                    type="text"
                                    name="title"
                                    className="input-glass"
                                    placeholder="Project Title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                />
                                
                                <select
                                    name="category"
                                    className="input-glass"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                >
                                    <option value="web">Web</option>
                                    <option value="mobile">Mobile</option>
                                    <option value="desktop">Desktop</option>
                                    <option value="other">Other</option>
                                </select>

                                <textarea
                                    name="description"
                                    className="input-glass"
                                    placeholder="Project Description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="4"
                                    style={{ gridColumn: '1 / -1' }}
                                    required
                                />

                                <input
                                    type="text"
                                    name="technologies"
                                    className="input-glass"
                                    placeholder="Technologies (comma separated)"
                                    value={formData.technologies}
                                    onChange={handleInputChange}
                                    style={{ gridColumn: '1 / -1' }}
                                />

                                <input
                                    type="url"
                                    name="liveLink"
                                    className="input-glass"
                                    placeholder="Live Link (optional)"
                                    value={formData.liveLink}
                                    onChange={handleInputChange}
                                />

                                <input
                                    type="url"
                                    name="githubLink"
                                    className="input-glass"
                                    placeholder="GitHub Link (optional)"
                                    value={formData.githubLink}
                                    onChange={handleInputChange}
                                />

                                <div className="file-input-container">
                                    <label htmlFor="image" className="file-label">
                                        {formData.image ? formData.image.name : 'Choose Image'}
                                    </label>
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleInputChange}
                                        style={{ display: 'none' }}
                                    />
                                </div>

                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={formData.featured}
                                        onChange={handleInputChange}
                                    />
                                    <span>Featured Project</span>
                                </label>
                            </div>

                            <div className="form-buttons">
                                <button type="button" className="btn btn-glass" onClick={resetForm}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editingProject ? 'Update' : 'Add'} Project
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}

                <div className="projects-grid projects-grid--two-columns">
                    {projects.length === 0 ? (
                        <motion.div 
                            className="empty-state glass"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <p>No projects yet. Add your first project!</p>
                        </motion.div>
                    ) : (
                        projects.map((project, index) => (
                            <motion.div
                                key={project._id}
                                className="project-card glass glass-hover"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => {
                                    setSelectedProject(project);
                                    setShowDetailModal(true);
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                {project.image && (
                                    <div className="project-image">
                                        <img src={getAssetUrl(project.image)} alt={project.title} />
                                    </div>
                                )}
                                
                                <div className="project-content">
                                    <h3>{project.title}</h3>
                                    {project.featured && <span className="badge">Featured</span>}
                                    <p className="project-category">{project.category}</p>
                                    
                                    {project.technologies && project.technologies.length > 0 && (
                                        <div className="technologies">
                                            {project.technologies.map((tech, i) => (
                                                <span key={i} className="tech-tag">{tech}</span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="project-links">
                                        {project.liveLink && (
                                            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-glass btn-sm">
                                                Live Demo
                                            </a>
                                        )}
                                        {project.githubLink && (
                                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn btn-glass btn-sm">
                                                GitHub
                                            </a>
                                        )}
                                    </div>

                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </motion.div>

            <SecurityModal
                isOpen={showSecurityModal}
                onClose={() => setShowSecurityModal(false)}
                onSuccess={handleSecuritySuccess}
            />

            <ProjectDetailModal
                project={selectedProject}
                isOpen={showDetailModal}
                onClose={() => {
                    setShowDetailModal(false);
                    setSelectedProject(null);
                }}
            />
        </div>
    );
};

export default Projects;
