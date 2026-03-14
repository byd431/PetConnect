import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PawPrint } from 'lucide-react';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    // Hide cursor when it leaves the window
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  // Hide system cursor via a global style applied when this component mounts
  useEffect(() => {
    document.body.style.cursor = 'none';
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [role="button"], .cursor-pointer');
    interactiveElements.forEach((el) => {
      (el as HTMLElement).style.cursor = 'none';
    });

    // Observer to handle dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Element node
              const el = node as HTMLElement;
              if (el.matches && el.matches('a, button, input, select, textarea, [role="button"], .cursor-pointer')) {
                el.style.cursor = 'none';
              }
              const children = el.querySelectorAll ? el.querySelectorAll('a, button, input, select, textarea, [role="button"], .cursor-pointer') : [];
              children.forEach((child) => {
                (child as HTMLElement).style.cursor = 'none';
              });
            }
          });
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.style.cursor = 'auto';
      observer.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center text-[#f29933]"
      animate={{
        x: mousePosition.x - 16, // Center the paw
        y: mousePosition.y - 16,
        scale: isClicking ? 0.7 : 1,
        rotate: isClicking ? -15 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 800,
        damping: 35,
        mass: 0.5,
      }}
      style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}
    >
      <PawPrint size={32} className="fill-[#f29933] opacity-90" />
    </motion.div>
  );
};
