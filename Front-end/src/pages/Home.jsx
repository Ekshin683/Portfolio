import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { homeAPI } from '../services/api';
import { getAssetUrl } from '../services/urls';
import { useAuth } from '../context/AuthContext';
import SecurityModal from '../components/SecurityModal';
import './Home.css';

const Home = () => {
    const [homeData, setHomeData] = useState({
        profileImage: '',
        name: 'Ekshindeep Gurramkonda',
        tagline: 'Showcasing Excellence in Development & Innovation'
    });
    const [loading, setLoading] = useState(true);
    const [showSecurityModal, setShowSecurityModal] = useState(false);
    const { clearAuth } = useAuth();

    useEffect(() => {
        fetchHomeData();
    }, []);

    const fetchHomeData = async () => {
        try {
            const response = await homeAPI.get();
            if (response.data.data) {
                setHomeData(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching home data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePhotoUpload = () => {
        setShowSecurityModal(true);
    };

    const handleSecuritySuccess = () => {
        document.getElementById('profileImageInput').click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('profileImage', file);
            formData.append('name', homeData.name);
            formData.append('tagline', homeData.tagline);

            try {
                const response = await homeAPI.update(formData);
                setHomeData(response.data.data);
                alert('Profile photo updated successfully!');
                clearAuth(); // Clear authentication after successful operation
            } catch (error) {
                console.error('Error uploading photo:', error);
                alert(error.response?.data?.message || 'Failed to upload photo');
            }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const stats = [
        { value: '3+', label: 'Years of Experience' },
        { value: '10+', label: 'Projects Completed' },
        { value: '15+', label: 'Technologies Mastered' },
        { value: '5+', label: 'Happy Clients' }
    ];

    const socialLinks = [
        { name: 'LinkedIn', icon: '💼', url: '#', color: '#0077b5' },
        { name: 'GitHub', icon: '💻', url: '#', color: '#333' },
        { name: 'Email', icon: '✉️', url: 'mailto:your@email.com', color: '#EA4335' }
    ];

    return (
        <div className="home-page">
            <div className="hero-container">
                <motion.div 
                    className="hero-section"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="hero-content-wrapper">
                        {/* Left Side - Text Content */}
                        <div className="hero-text-content">
                            <motion.h1 className="hero-main-title" variants={itemVariants}>
                                Hi, I'm {homeData.name}
                            </motion.h1>

                            <motion.h2 className="hero-subtitle" variants={itemVariants}>
                                {homeData.tagline}
                            </motion.h2>

                            <motion.p className="hero-description" variants={itemVariants}>
                                <span className="wave-emoji">👋</span> Hi, I am {homeData.name}. Creating exceptional digital experiences with modern web technologies
                                and innovative solutions tailored to your needs.
                            </motion.p>
                        </div>

                        {/* Right Side - Profile Image */}
                        <motion.div 
                            className="hero-image-section"
                            initial={{ opacity: 0, scale: 0.8, x: 100 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="profile-card">
                                <div className="profile-name-badge">{homeData.name}</div>
                                <div className="profile-image-wrapper" onClick={handlePhotoUpload}>
                                    <div className="profile-image-container-new">
                                        {homeData.profileImage ? (
                                            <img 
                                                src={getAssetUrl(homeData.profileImage)} 
                                                alt="Profile"
                                                className="profile-main-image"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                        ) : null}
                                        <div className="profile-placeholder" style={{ display: homeData.profileImage ? 'none' : 'flex' }}>
                                            <div className="placeholder-icon">◈</div>
                                            <div className="upload-hint">Click to upload photo</div>
                                        </div>
                                    </div>
                                    <div className="upload-overlay-new">
                                        <span>📷</span>
                                        <span>Update Photo</span>
                                    </div>
                                </div>
                                <div className="profile-actions">
                                    <Link to="/contact" className="btn-hire">📄 Hire Me</Link>
                                    <Link to="/contact" className="btn-talk">📧 Lets Talk</Link>
                                </div>
                            </div>
                            <input
                                type="file"
                                id="profileImageInput"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Quick Links Section */}
            <motion.div 
                className="quick-links-section-box"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.6 }}
            >
                <h2 className="section-heading-box">Explore My Work</h2>
                <div className="quick-links-grid">
                    {[
                        { title: 'Projects', path: '/projects', desc: 'View my latest work' },
                        { title: 'Resume', path: '/resume', desc: 'My latest CV and profile' },
                        { title: 'Education', path: '/education', desc: 'Academic journey' },
                        { title: 'Achievements', path: '/achievements', desc: 'Awards & Recognition' },
                        { title: 'Certifications', path: '/certifications', desc: 'Verified certificates' },
                        { title: 'Skills', path: '/skills', desc: 'Technical expertise' }
                    ].map((item, index) => (
                        <motion.div
                            key={item.path}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2 + index * 0.1 }}
                            style={{ display: 'flex', height: '100%' }}
                        >
                            <Link to={item.path} className="quick-link-card glass glass-hover" style={{ flex: 1 }}>
                                <h3>{item.title}</h3>
                                <p className="quick-link-desc">{item.desc}</p>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <SecurityModal
                isOpen={showSecurityModal}
                onClose={() => setShowSecurityModal(false)}
                onSuccess={handleSecuritySuccess}
            />
        </div>
    );
};

export default Home;
