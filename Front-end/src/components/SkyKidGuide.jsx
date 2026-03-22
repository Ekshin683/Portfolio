import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import './SkyKidGuide.css';

const DOCK_X = () => Math.max(40, window.innerWidth - 110);
const DOCK_Y = () => Math.max(110, window.innerHeight - 210);

const routeNames = {
    '/': 'Home',
    '/projects': 'Projects',
    '/resume': 'Resume',
    '/education': 'Education',
    '/achievements': 'Achievements',
    '/certifications': 'Certifications',
    '/skills': 'Skills',
    '/contact': 'Contact'
};

const routeGreets = {
    '/': "Hey! Welcome to the portfolio. Click anything!!",
    '/projects': "Cool projects ahead! Let me show you around.",
    '/resume': "Here's the resume. Impressive stuff inside!",
    '/education': "School days! Let's check the education.",
    '/achievements': "Trophies and wins! Love this section.",
    '/certifications': "Certified and skilled! Check these out.",
    '/skills': "So many skills! This person goes hard.",
    '/contact': "Want to say hi? Drop a message here!"
};

function CartoonKid({ eyeOffset, isMoving, facingLeft }) {
    return (
        <svg
            width="78"
            height="130"
            viewBox="0 0 78 130"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: facingLeft ? 'scaleX(-1)' : 'scaleX(1)', transition: 'transform 0.25s ease', display: 'block' }}
        >
            {/* === CAP === */}
            <ellipse cx="39" cy="22" rx="20" ry="6" fill="#f59e0b" />
            <path d="M19 22 Q19 8 39 8 Q59 8 59 22 Z" fill="#f59e0b" />
            <rect x="15" y="20" width="12" height="5" rx="2" fill="#ea580c" />

            {/* === HEAD === */}
            <ellipse cx="39" cy="34" rx="17" ry="18" fill="#FDDCB0" />
            {/* ear */}
            <ellipse cx="22" cy="35" rx="4" ry="5" fill="#FDDCB0" />
            <ellipse cx="56" cy="35" rx="4" ry="5" fill="#FDDCB0" />

            {/* === EYES === */}
            {/* left eye white */}
            <ellipse cx="32" cy="33" rx="5" ry="5.5" fill="white" />
            {/* right eye white */}
            <ellipse cx="46" cy="33" rx="5" ry="5.5" fill="white" />
            {/* pupils */}
            <circle cx={32 + eyeOffset.x} cy={33 + eyeOffset.y} r="2.8" fill="#1a1a1a" />
            <circle cx={46 + eyeOffset.x} cy={33 + eyeOffset.y} r="2.8" fill="#1a1a1a" />
            {/* eye shine */}
            <circle cx={33.5 + eyeOffset.x} cy={31.5 + eyeOffset.y} r="1" fill="white" />
            <circle cx={47.5 + eyeOffset.x} cy={31.5 + eyeOffset.y} r="1" fill="white" />
            {/* eyebrows */}
            <path d="M28 27 Q32 24 36 27" stroke="#5b3414" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M42 27 Q46 24 50 27" stroke="#5b3414" strokeWidth="1.8" strokeLinecap="round" fill="none" />

            {/* === MOUTH === */}
            <path d="M34 43 Q39 48 44 43" stroke="#c26f3a" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* === NECK === */}
            <rect x="35" y="50" width="8" height="8" rx="2" fill="#FDDCB0" />

            {/* === T-SHIRT (body) === */}
            <path d="M20 58 L15 72 L21 74 L22 88 L56 88 L57 74 L63 72 L58 58 L49 55 Q39 60 29 55 Z" fill="#6366f1" />
            {/* collar */}
            <path d="M29 55 Q39 64 49 55" stroke="#4f46e5" strokeWidth="1.5" fill="none" />
            {/* sleeve left */}
            <path d="M20 58 L10 66 L14 70 L21 64 Z" fill="#6366f1" />
            {/* sleeve right */}
            <path d="M58 58 L68 66 L64 70 L57 64 Z" fill="#6366f1" />

            {/* === SHORTS === */}
            <path d="M22 88 L20 108 L36 108 L39 96 L42 108 L58 108 L56 88 Z" fill="#1e40af" />
            {/* shorts center line */}
            <line x1="39" y1="88" x2="39" y2="105" stroke="#1d3a9e" strokeWidth="1.5" />

            {/* === ARMS (animated walk swing when moving) === */}
            <motion.g
                animate={isMoving ? { rotate: [20, -20, 20] } : { rotate: 0 }}
                transition={{ duration: 0.45, repeat: isMoving ? Infinity : 0, ease: 'easeInOut' }}
                style={{ transformOrigin: '14px 68px' }}
            >
                <rect x="7" y="68" width="8" height="22" rx="4" fill="#FDDCB0" />
            </motion.g>
            <motion.g
                animate={isMoving ? { rotate: [-20, 20, -20] } : { rotate: 0 }}
                transition={{ duration: 0.45, repeat: isMoving ? Infinity : 0, ease: 'easeInOut' }}
                style={{ transformOrigin: '63px 68px' }}
            >
                <rect x="63" y="68" width="8" height="22" rx="4" fill="#FDDCB0" />
            </motion.g>

            {/* === LEGS === */}
            {/* left leg */}
            <motion.g
                animate={isMoving ? { rotate: [-22, 22, -22] } : { rotate: 0 }}
                transition={{ duration: 0.45, repeat: isMoving ? Infinity : 0, ease: 'easeInOut' }}
                style={{ transformOrigin: '28px 108px' }}
            >
                <rect x="23" y="108" width="10" height="18" rx="4" fill="#FDDCB0" />
                {/* sneaker left */}
                <ellipse cx="28" cy="127" rx="9" ry="4" fill="#111" />
                <ellipse cx="30" cy="126" rx="5" ry="2.5" fill="#fff" />
            </motion.g>
            {/* right leg */}
            <motion.g
                animate={isMoving ? { rotate: [22, -22, 22] } : { rotate: 0 }}
                transition={{ duration: 0.45, repeat: isMoving ? Infinity : 0, ease: 'easeInOut' }}
                style={{ transformOrigin: '50px 108px' }}
            >
                <rect x="45" y="108" width="10" height="18" rx="4" fill="#FDDCB0" />
                {/* sneaker right */}
                <ellipse cx="50" cy="127" rx="9" ry="4" fill="#111" />
                <ellipse cx="52" cy="126" rx="5" ry="2.5" fill="#fff" />
            </motion.g>
        </svg>
    );
}

function SkyKidGuide() {
    const location = useLocation();
    const cursorRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const posRef = useRef({ x: DOCK_X(), y: DOCK_Y() });
    const [displayPos, setDisplayPos] = useState({ x: DOCK_X(), y: DOCK_Y() });
    const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
    const [isMoving, setIsMoving] = useState(false);
    const [facingLeft, setFacingLeft] = useState(false);
    const [speech, setSpeech] = useState("Hey! I'm your guide. Click anything!");
    const [showSpeech, setShowSpeech] = useState(true);
    const movingTimerRef = useRef(null);
    const speechTimerRef = useRef(null);
    const animRef = useRef(null);

    // smooth follow to target
    useEffect(() => {
        let targetX = posRef.current.x;
        let targetY = posRef.current.y;
        let curX = displayPos.x;
        let curY = displayPos.y;

        const tick = () => {
            targetX = posRef.current.x;
            targetY = posRef.current.y;
            const dx = targetX - curX;
            const dy = targetY - curY;
            if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
                curX += dx * 0.09;
                curY += dy * 0.09;
                setDisplayPos({ x: curX, y: curY });
            }
            animRef.current = requestAnimationFrame(tick);
        };
        animRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(animRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // cursor tracking for eyes
    useEffect(() => {
        const onMove = (e) => {
            cursorRef.current = { x: e.clientX, y: e.clientY };
            const dx = e.clientX - displayPos.x - 39;
            const dy = e.clientY - displayPos.y - 34;
            const dist = Math.hypot(dx, dy) || 1;
            const max = 3.5;
            setEyeOffset({
                x: Math.min(max, (dx / dist) * max),
                y: Math.min(max, (dy / dist) * max)
            });
        };
        const onResize = () => {
            posRef.current = { x: DOCK_X(), y: DOCK_Y() };
        };
        window.addEventListener('mousemove', onMove);
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('resize', onResize);
        };
    }, [displayPos]);

    // click: move toward click
    useEffect(() => {
        const onClick = (e) => {
            const newX = Math.max(10, Math.min(window.innerWidth - 90, e.clientX - 39));
            const newY = Math.max(70, Math.min(window.innerHeight - 145, e.clientY - 130));

            setFacingLeft(newX < posRef.current.x);
            posRef.current = { x: newX, y: newY };
            setIsMoving(true);

            const clickTarget = e.target.closest('a, button, .card, .project-card, [class*="btn"]');
            if (clickTarget) {
                const label = clickTarget.textContent?.trim()?.replace(/\s+/g, ' ').slice(0, 50);
                if (label && label.length > 1) {
                    showMsg(`Going to: ${label}`);
                }
            }

            clearTimeout(movingTimerRef.current);
            movingTimerRef.current = setTimeout(() => {
                posRef.current = { x: DOCK_X(), y: DOCK_Y() };
                setIsMoving(false);
            }, 1200);
        };
        window.addEventListener('click', onClick);
        return () => window.removeEventListener('click', onClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // page change
    useEffect(() => {
        posRef.current = { x: DOCK_X(), y: DOCK_Y() };
        const timer = setTimeout(() => {
            const cardCount = document.querySelectorAll('.card, .project-card').length;
            const greet = routeGreets[location.pathname];
            showMsg(cardCount > 0 ? `${greet} Found ${cardCount} items!` : greet || 'Welcome!');
        }, 600);
        return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    function showMsg(msg) {
        clearTimeout(speechTimerRef.current);
        setSpeech(msg);
        setShowSpeech(true);
        speechTimerRef.current = setTimeout(() => setShowSpeech(false), 3800);
    }

    return (
        <div
            className="skykid-root"
            style={{ left: displayPos.x, top: displayPos.y }}
        >
            <AnimatePresence>
                {showSpeech && (
                    <motion.div
                        className="skykid-speech glass"
                        key={speech}
                        initial={{ opacity: 0, y: 6, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.94 }}
                        transition={{ duration: 0.22 }}
                    >
                        {speech}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                animate={isMoving
                    ? { y: [0, -10, 0], rotate: facingLeft ? -4 : 4 }
                    : { y: [0, -5, 0], rotate: 0 }}
                transition={{ duration: isMoving ? 0.38 : 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
                <CartoonKid eyeOffset={eyeOffset} isMoving={isMoving} facingLeft={facingLeft} />
            </motion.div>
        </div>
    );
}

export default SkyKidGuide;
