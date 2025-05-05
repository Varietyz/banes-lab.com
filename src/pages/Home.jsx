// 📂 src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { LazyMotion, domAnimation, m, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import useInView from '../hooks/useInView';

const fadeInVariant = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0 }
};

const scaleVariant = {
  hidden: { scale: 0 },
  visible: { scale: 1 }
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

/**
 *
 */
export default function Home() {
  const totalDuration = 0.7;
  const [headerRef, headerInView] = useInView({ threshold: 0.1 });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.1 });
  const headerControls = useAnimation();
  const aboutControls = useAnimation();

  useEffect(() => {
    if (headerInView) headerControls.start('visible');
  }, [headerInView, headerControls]);

  useEffect(() => {
    if (aboutInView) aboutControls.start('visible');
  }, [aboutInView, aboutControls]);

  return (
    <LazyMotion features={domAnimation}>
      <div className="h-screen overflow-y-auto no-scrollbar px-4 sm:px-6 lg:px-8">
        <section className="w-full px-4 py-20 md:py-32 text-center">
          <m.div
            ref={headerRef}
            initial="hidden"
            animate={headerControls}
            variants={staggerContainer}
            className="w-full max-w-3xl mx-auto mb-16">
            {/* Logo Animation */}
            <m.img
              src="/assets/images/banes_lab/700px_Main_Animated.gif"
              alt="Varietyz Logo"
              className="w-40 h-40 mx-auto mb-6 rounded-full  shadow-md"
              variants={scaleVariant}
              transition={{ duration: totalDuration, ease: 'backOut' }}
            />

            {/* Heading Animation */}
            <m.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-gold mb-4"
              variants={fadeInVariant}
              transition={{ duration: totalDuration }}>
              Bane's Lab
            </m.h2>

            {/* Description Animation */}
            <m.p
              className="text-base sm:text-lg md:text-xl lg:text-xl text-white font-body mb-8"
              variants={fadeInVariant}
              transition={{ duration: totalDuration }}>
              Crafting unique, professional experiences across{' '}
              <span className="text-gold font-semibold">tech</span>,{' '}
              <span className="text-gold font-semibold">gaming</span>,{' '}
              <span className="text-gold font-semibold">corporate</span>, and{' '}
              <span className="text-gold font-semibold">creative</span> ventures.
            </m.p>

            {/* Links Animation */}
            <m.div
              className="w-full max-w-lg mx-auto grid grid-cols-1 sm:grid-cols-2 gap-y-4"
              variants={fadeInVariant}
              transition={{ duration: totalDuration, ease: 'backOut' }}>
              <div className="flex justify-center sm:justify-end sm:pr-4 mb-4 sm:mb-0 ">
                <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/graphics"
                    className="px-8 py-3 bg-gold text-dark font-bold rounded-full shadow hover:bg-accent transition duration-300">
                    Explore Graphics
                  </Link>
                </m.div>
              </div>
              <div className="flex justify-center sm:justify-start sm:pl-4">
                <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/contact"
                    className="px-8 py-3 border-2 border-gold text-gold font-bold rounded-full hover:bg-gold hover:text-dark transition duration-300">
                    Contact Me
                  </Link>
                </m.div>
              </div>
            </m.div>
          </m.div>

          {/* About Me Section */}
          <m.div
            ref={aboutRef}
            initial="hidden"
            animate={aboutControls}
            variants={fadeInVariant}
            transition={{ duration: totalDuration, ease: 'easeOut' }}
            className="w-full max-w-3xl xl:max-w-4xl mx-auto text-left bg-dark p-4 sm:p-6 lg:p-8 rounded-xl shadow-xl">
            <h3 className="text-2xl md:text-3xl font-heading text-gold mb-2 text-center">
              About Me
            </h3>
            <div className="border-b-2 border-gold w-12 mx-auto mb-4" />

            <div className="flex flex-col md:flex-row md:items-start md:gap-4">
              <m.div
                variants={scaleVariant}
                transition={{ duration: totalDuration, ease: 'backOut' }}
                className="flex-shrink-0 mb-4 md:mb-0 mx-auto md:mx-0">
                <img
                  src="/assets/images/real_life/beach.jpg"
                  alt="Bane's Portrait"
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-gold shadow-md object-cover"
                />
              </m.div>

              <m.div
                variants={fadeInVariant}
                transition={{ duration: totalDuration }}
                className="flex-grow text-white space-y-3 text-sm md:text-base">
                <p className="leading-relaxed">
                  Hey there, I'm <span className="text-gold font-semibold">Bane</span>. I'm a
                  self-taught <span className="text-gold font-semibold">developer</span> and{' '}
                  <span className="text-gold font-semibold">graphic designer</span> who's passionate
                  about building things that look great and work even better. My specialty lies in
                  crafting <span className="text-gold font-semibold">clean</span>, user-friendly
                  interfaces and efficient code.
                </p>
                <p className="leading-relaxed">
                  Over the years, I've collaborated on a variety of projects, from{' '}
                  <span className="text-gold font-semibold">gaming communities</span> and{' '}
                  <span className="text-gold font-semibold">esports branding</span>, to designing
                  custom applications for{' '}
                  <span className="text-gold font-semibold">corporate clients</span>. I'm always
                  focused on delivering results that combine{' '}
                  <span className="text-gold font-semibold">creativity</span> and{' '}
                  <span className="text-gold font-semibold">practicality</span>.
                </p>
                <p className="leading-relaxed">
                  I'm committed to continuous improvement, always diving into new technologies or
                  design approaches to stay ahead of the curve. Whether it's developing intuitive
                  user experiences or creating visually compelling designs, my goal is to produce{' '}
                  <span className="text-gold font-semibold">impactful</span> and{' '}
                  <span className="text-gold font-semibold">innovative</span> solutions that truly
                  resonate.
                </p>
                <p className="leading-relaxed pt-8 text-center">
                  For detailed information about my platform’s architecture, policies, and terms,
                  please visit the
                  <Link to="/service" className="text-gold font-semibold hover:underline ml-1">
                    Terms of Service
                  </Link>
                  ,
                  <Link to="/privacy" className="text-gold font-semibold hover:underline ml-1">
                    Privacy Policy
                  </Link>
                  , and
                  <Link to="/info" className="text-gold font-semibold hover:underline ml-1">
                    Website Information
                  </Link>{' '}
                  pages.
                </p>
              </m.div>
            </div>
          </m.div>
        </section>
      </div>
    </LazyMotion>
  );
}
