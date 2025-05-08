// 📂 src/pages/UnderConstruction.jsx
import { LazyMotion, domAnimation, m, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useInView from '../../hooks/useInView';

const fadeInVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

/**
 * A playful "Under Construction" page with a 15-second countdown
 * that auto-navigates back to /clan.
 * On hover, we show "Go back now!" instead of the countdown,
 * and clicking takes you to /clan immediately.
 * The box size stays stable.
 */
export default function UnderConstruction() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const controls = useAnimation();

  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(15);

  // For showing/hiding the hover message
  const [isHovered, setIsHovered] = useState(false);

  // Animate page sections when in view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  // Countdown logic & auto-redirect
  useEffect(() => {
    if (countdown === 0) {
      navigate('/clan');
      return;
    }
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  // If hovered, we show "Go back now!"
  // Else we show the small countdown text
  // Both use the same text size/line-height to avoid resizing
  const displayText = isHovered ? (
    <span className="text-sm text-white font-semibold whitespace-nowrap">Go back now!</span>
  ) : (
    <span className="text-sm text-white/60 whitespace-nowrap">
      Returning in <span className="text-gold font-bold">{countdown}</span> second
      {countdown !== 1 && 's'}
    </span>
  );

  return (
    <LazyMotion features={domAnimation}>
      <div className="px-4 scroll-smooth">
        <m.section
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="max-w-3xl mx-auto bg-dark rounded-xl border border-gold shadow-xl p-6 sm:p-8 lg:p-12 text-white space-y-8">
          {/* Header */}
          <m.div variants={fadeInVariant} className="text-center space-y-2">
            <h2 className="text-4xl md:text-5xl font-heading text-gold">🚧 Under Construction</h2>
            <p className="text-sm md:text-base text-white/70">
              This page is still being built. Come back soon!
            </p>
          </m.div>

          {/* Body */}
          <m.div variants={fadeInVariant} className="space-y-4 text-center">
            <p className="text-base md:text-lg text-white/80 leading-relaxed">
              We&apos;re busy hammering away at new features, improvements, and all kinds of fun
              content. Thanks for your patience!
            </p>
            <p className="text-sm md:text-base text-yellow-400 font-code">
              In the meantime, feel free to explore other parts of our site.
            </p>
          </m.div>

          {/* Hover box + countdown/redirect */}
          <m.div variants={fadeInVariant} className="text-center pt-4">
            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                bg-gold/20
                rounded-md
                border
                border-gold/30
                cursor-pointer
                select-none
                min-w-[200px]    /* ensures stable width */
                max-w-[200px]
                justify-center    /* keep text centered */
              "
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => navigate('/clan')}>
              <span className="animate-spin inline-block">
                <svg
                  className="w-5 h-5 text-gold"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M12 4v1m6.364 1.636l-.707.707M20 12h-1M17.636 17.636l-.707-.707M12 19v1M6.364 17.636l.707-.707M4 12H3m2.636-6.364l.707.707"
                  />
                </svg>
              </span>

              {/* The text swaps on hover, same overall size */}
              {displayText}
            </div>
          </m.div>
        </m.section>
      </div>
    </LazyMotion>
  );
}
