import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import SkyKidGuide from './components/SkyKidGuide';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import Education from './pages/Education';
import Achievements from './pages/Achievements';
import Certifications from './pages/Certifications';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import './App.css';

const pageVariants = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] }
    },
    exit: {
        opacity: 0,
        y: -10,
        scale: 0.99,
        transition: { duration: 0.28, ease: [0.4, 0, 1, 1] }
    }
};

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                <Routes location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/resume" element={<Resume />} />
                    <Route path="/education" element={<Education />} />
                    <Route path="/achievements" element={<Achievements />} />
                    <Route path="/certifications" element={<Certifications />} />
                    <Route path="/skills" element={<Skills />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </motion.div>
        </AnimatePresence>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Navbar />
                    <AnimatedRoutes />
                    <SkyKidGuide />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
