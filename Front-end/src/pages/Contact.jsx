import { motion } from 'framer-motion';
import { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Message sent! (This is a demo - no actual email is sent)');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="page-container">
            <motion.div 
                className="container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="contact-header"
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="section-heading">Get In Touch</h1>
                    <p className="contact-subtitle">
                        Have a project in mind? Let's create something amazing together!
                    </p>
                </motion.div>

                <div className="contact-content">
                    <motion.div 
                        className="contact-info"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <a href="mailto:ekshindeep@gmail.com" className="info-card-link">
                            <div className="info-card glass">
                                <div className="info-icon">📧</div>
                                <h3>Email</h3>
                                <p>ekshindeep@gmail.com</p>
                            </div>
                        </a>

                        <div className="info-card glass">
                            <div className="info-icon">📱</div>
                            <h3>Phone</h3>
                            <p>+91 7331143402</p>
                        </div>

                        <div className="info-card glass">
                            <div className="info-icon">📍</div>
                            <h3>Location</h3>
                            <p>Tirupati, India</p>
                        </div>

                        <div className="social-links-contact">
                            <h3>Follow Me</h3>
                            <div className="social-icons">
                                <a href="https://www.linkedin.com/in/ekshindeep-gurramkonda/" target="_blank" rel="noopener noreferrer" className="social-icon-link glass">LinkedIn</a>
                                <a href="https://github.com/Ekshin683" target="_blank" rel="noopener noreferrer" className="social-icon-link glass">GitHub</a>
                            </div>
                        </div>
                    </motion.div>

                    <motion.form 
                        className="contact-form glass"
                        onSubmit={handleSubmit}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h2>Send a Message</h2>
                        
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                className="input-glass"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                className="input-glass"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                name="subject"
                                className="input-glass"
                                placeholder="Subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <textarea
                                name="message"
                                className="input-glass"
                                placeholder="Your Message"
                                rows="6"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary btn-large">
                            Send Message →
                        </button>
                    </motion.form>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;
