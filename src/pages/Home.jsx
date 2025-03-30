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
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

  return (
    <LazyMotion features={domAnimation}>
      <div className="h-screen overflow-y-auto no-scrollbar">
        <section className="w-full px-4 py-20 md:py-32 text-center">
          <m.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={staggerContainer}
            className="w-full max-w-3xl mx-auto mb-16">
            {/* Logo Animation */}
            <m.img
              src="/assets/images/varietyz/varietyz_logo.gif"
              alt="Varietyz Logo"
              className="w-40 h-40 mx-auto mb-6 rounded-full border border-gold shadow-md"
              variants={scaleVariant}
              transition={{ duration: totalDuration, ease: 'backOut' }}
            />

            {/* Heading Animation */}
            <m.h2
              className="text-4xl md:text-5xl font-heading text-gold mb-4"
              variants={fadeInVariant}
              transition={{ duration: totalDuration }}>
              Bane's Lab
            </m.h2>

            {/* Description Animation */}
            <m.p
              className="text-lg md:text-xl text-white font-body mb-8"
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
              className="flex justify-center gap-6 flex-wrap"
              variants={fadeInVariant}
              transition={{ duration: totalDuration, ease: 'backOut' }}>
              <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/graphics"
                  className="px-8 py-3 bg-gold text-dark font-bold rounded-full shadow hover:bg-accent transition duration-300">
                  Explore Graphics
                </Link>
              </m.div>
              <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/contact"
                  className="px-8 py-3 border-2 border-gold text-gold font-bold rounded-full hover:bg-gold hover:text-dark transition duration-300">
                  Contact Me
                </Link>
              </m.div>
            </m.div>
          </m.div>

          {/* About Me Section */}
          <m.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={fadeInVariant}
            transition={{ duration: totalDuration, ease: 'easeOut' }}
            className="w-full max-w-2xl mx-auto text-left bg-dark p-4 md:p-6 rounded-xl shadow-xl">
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
                  className="w-32 h-32 rounded-full border-2 border-gold shadow-md object-cover"
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
              </m.div>
            </div>
          </m.div>
        </section>
      </div>
    </LazyMotion>
  );
}
