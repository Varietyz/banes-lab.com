// 📂 src/pages/graphics/Graphics.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Create a motion-enhanced Link component for cleaner syntax.
const MotionLink = motion(Link);

/**
 * Graphics page showcasing visual work.
 * - Page links animate in from off-screen.
 * - The header "Graphics Showcase" displays a light beam overlay that animates once on page load,
 *   fading in and then out over the solid themed gold text.
 */
export default function Graphics() {
  const pages = [
    { name: 'Varietyz', path: '/graphics/varietyz', icon: '/assets/icons/varietyz.png' },
    { name: 'Enigma Esports', path: '/graphics/enigma', icon: '/assets/icons/enigma.png' },
    { name: 'Droptracker', path: '/graphics/droptracker', icon: '/assets/icons/droptracker.png' },
    { name: 'RoseyRS', path: '/graphics/roseyrs', icon: '/assets/icons/roseyrs.png' },
    {
      name: 'RuneLite Themes',
      path: '/graphics/runelite',
      icon: '/assets/icons/runelite.png'
    },
    { name: 'Logos', path: '/graphics/logos', icon: '/assets/icons/logos.png' }
  ];

  // Determine viewport; on mobile, use a single-column effect.
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : true;
  const baseOffset = 20; // Additional offset per element (in pixels)
  const offsetMultiplier = 1.2; // Multiplier to control offscreen start distance
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;

  return (
    <div className="h-screen overflow-y-auto no-scrollbar px-4 py-20 md:py-32 scroll-smooth">
      <section className="max-w-4xl mx-auto space-y-6 text-center">
        {/* Header with two layers:
            - Base text (solid gold)
            - Animated overlay (light beam effect with opacity keyframes) */}
        <h2 className="text-4xl font-heading relative" style={{ color: '#cea555' }}>
          Graphics Showcase
          <motion.span
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(120deg, #cea555 30%, white 50%, #cea555 70%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              mixBlendMode: 'screen'
            }}
            initial={{ backgroundPositionX: '0%', opacity: 0 }}
            animate={{ backgroundPositionX: '100%', opacity: [0, 1, 0] }}
            transition={{ duration: 1.8, ease: 'easeOut' }}>
            Graphics Showcase
          </motion.span>
        </h2>

        <p className="text-lg text-white/70">
          Browse curated visual work categorized by project and purpose.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 pt-8 w-full">
          {pages.map(({ name, path, icon }, index) => {
            // On mobile, compute the offset from the left; on desktop, alternate left/right.
            const initialX = isMobile
              ? -(windowWidth * offsetMultiplier + (index + 1) * baseOffset)
              : index % 2 === 0
                ? -(windowWidth * offsetMultiplier + (index + 1) * baseOffset)
                : windowWidth * offsetMultiplier + (index + 1) * baseOffset;

            return (
              <MotionLink
                key={path}
                to={path}
                initial={{ opacity: 0, x: initialX, filter: 'blur(20px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ delay: index * 0.03, duration: 0.1, ease: 'easeOut' }}
                style={{ willChange: 'transform, opacity, filter' }}
                className="bg-dark border border-gold rounded-xl p-6 hover:shadow-lg transition text-gold hover:bg-accent hover:text-dark  text-lg md:text-xl font-heading flex items-center justify-center w-full h-14 md:h-15 lg:h-15 ">
                <img
                  src={icon}
                  alt={`${name} icon`}
                  className="w-6 h-6 mr-2 aspect-square object-contain"
                />
                {name}
              </MotionLink>
            );
          })}
        </div>
      </section>
    </div>
  );
}
