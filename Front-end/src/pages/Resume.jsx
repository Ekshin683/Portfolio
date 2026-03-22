import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { resumeAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import SecurityModal from '../components/SecurityModal';
import '../pages/Projects.css';

const Resume = () => {
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showSecurityModal, setShowSecurityModal] = useState(false);
    const [showUploadForm, setShowUploadForm] = useState(false);
    const { isAuthenticated, clearAuth } = useAuth();

    const [formData, setFormData] = useState({
        title: '',
        cvFile: null
    });

    useEffect(() => {
        fetchResume();
    }, []);

    const fetchResume = async () => {
        try {
            const response = await resumeAPI.get();
            setResume(response.data.data);
        } catch (error) {
            console.error('Error fetching resume:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUploadClick = () => {
        setShowSecurityModal(true);
    };

    const handleSecuritySuccess = () => {
        setShowUploadForm(true);
        if (resume) {
            setFormData({
                title: resume.generalTitle || resume.title || 'General CV',
                cvFile: null
            });
        } else {
            setFormData({
                title: 'General CV',
                cvFile: null
            });
        }
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

        const currentCvPath = resume?.generalCvFile || resume?.cvFile || resume?.cvImage;

        if (!formData.cvFile && !currentCvPath) {
            alert('Please select a CV file to upload');
            return;
        }

        const data = new FormData();
        data.append('title', formData.title);
        data.append('cvType', 'general');
        if (formData.cvFile) {
            data.append('cvFile', formData.cvFile);
        }

        try {
            await resumeAPI.createOrUpdate(data);
            fetchResume();
            resetForm();
            clearAuth(); // Clear authentication after successful operation
        } catch (error) {
            console.error('Error saving resume:', error);
            alert(error.response?.data?.message || 'Failed to save resume');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete your CV?')) {
            try {
                await resumeAPI.delete();
                setResume(null);
                clearAuth(); // Clear authentication after successful deletion
            } catch (error) {
                console.error('Error deleting resume:', error);
                alert('Failed to delete resume');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            cvFile: null
        });
        setShowUploadForm(false);
    };

    const generalCvPath = resume?.generalCvFile || resume?.cvFile || resume?.cvImage;
    const generalCvType = (resume?.generalCvFileType || resume?.cvFileType || '').toLowerCase();
    const generalCvUrl = generalCvPath ? `http://localhost:5000${generalCvPath}` : null;
    const isGeneralPdf = generalCvType.includes('pdf') || (generalCvPath || '').toLowerCase().endsWith('.pdf');
    const cvTypeLabel = isGeneralPdf ? 'PDF' : ((generalCvPath || '').toLowerCase().endsWith('.docx') ? 'DOCX' : 'DOC');

    if (loading) return <div className="page-container"><div className="loading glass">Loading...</div></div>;

    return (
        <div className="page-container">
            <div className="container">
                <div className="page-header">
                    <h1 className="section-heading">Resume / CV</h1>
                    {!showUploadForm && (
                        <button className="btn btn-primary" onClick={handleUploadClick}>
                            {resume ? 'Update CV' : 'Upload CV'}
                        </button>
                    )}
                </div>

                {showUploadForm && (
                    <motion.div 
                        className="add-form glass"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h2>{resume ? 'Update CV' : 'Upload CV'}</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="title"
                                placeholder="CV Title (e.g., My Resume 2024) *"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="input-glass"
                                style={{marginBottom: '20px', width: '100%'}}
                                required
                            />
                            <div className="file-input-container" style={{marginBottom: '20px'}}>
                                <label className="file-label">
                                    <input
                                        type="file"
                                        name="cvFile"
                                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                        onChange={handleInputChange}
                                        style={{display: 'none'}}
                                        required
                                    />
                                    {formData.cvFile ? formData.cvFile.name : 'Choose CV File *'}
                                </label>
                            </div>
                            <p style={{fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', marginBottom: '20px'}}>
                                Upload your CV in PDF, DOC, or DOCX format.
                            </p>
                            <div className="form-buttons">
                                <button type="button" onClick={resetForm} className="btn btn-glass">
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {resume ? 'Update' : 'Upload'} CV
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}

                {!showUploadForm && (
                    resume ? (
                        <motion.div
                            className="projects-grid"
                            initial={{opacity: 0}} 
                            animate={{opacity: 1}}
                            style={{ marginBottom: '20px' }}
                        >
                            <div className="project-card glass" style={{ textAlign: 'left' }}>
                                <h3>{resume.generalTitle || resume.title || 'General CV'}</h3>
                                <p className="project-category">{cvTypeLabel} DOCUMENT</p>

                                {generalCvUrl && (
                                    <div className="project-links">
                                        <a href={generalCvUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Open Resume</a>
                                        <a href={generalCvUrl} download className="btn btn-glass">Download Resume</a>
                                    </div>
                                )}
                            </div>

                        </motion.div>
                    ) : (
                        <div className="empty-state glass">
                            <p>No CV uploaded yet. Click "Upload General CV" to get started!</p>
                        </div>
                    )
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

export default Resume;
