// 📂 src/pages/About.jsx
import { Link } from 'react-router-dom';
import { LazyMotion, domAnimation, m, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import useInView from '../hooks/useInView';

const fadeInVariant = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

/**
 *
 */
export default function About() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

  return (
    <LazyMotion features={domAnimation}>
      <div className="h-screen overflow-y-auto no-scrollbar px-4 py-20 md:py-32 scroll-smooth">
        <m.section
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="max-w-4xl xl:max-w-5xl mx-auto bg-dark rounded-xl border border-gold shadow-xl p-4 sm:p-6 lg:p-8 text-white space-y-12">
          {/* Header */}
          <m.div variants={fadeInVariant} className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-gold mb-2">
              About Me
            </h2>

            <div className="border-b-2 border-gold w-24 mx-auto mb-6" />
            <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto">
              I'm <span className="text-gold font-semibold">Bane</span>, a self-taught developer and
              designer with nearly 15 years of experience building full-stack systems, automation
              tools, and digital brand ecosystems.
            </p>
          </m.div>

          {/* Current Work */}
          <m.section variants={fadeInVariant} className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-heading text-gold">What I'm Working On</h3>
            <p>
              I'm currently the <span className="text-gold font-semibold">Creative Lead</span> for{' '}
              <span className="text-gold font-semibold">RoseyRS</span>, managing branding, Discord
              automation, and visual assets.
            </p>
            <p>
              I actively develop <span className="text-gold font-semibold">Varietyz Bot</span>, a
              production-grade Discord bot for OSRS clans featuring real-time stat tracking, webhook
              integrations, and automated processes.
            </p>
            <p>
              Through <span className="text-gold font-semibold">banes-lab.com</span>, I showcase my
              full-stack work, plugin systems, and design services aimed at creators, gamers, and
              tech brands.
            </p>
          </m.section>

          {/* Professional Background */}
          <m.section variants={fadeInVariant} className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-heading text-gold">Professional Journey</h3>
            <p>
              My career began with founding{' '}
              <span className="text-gold font-semibold">Jaybane Computers</span>, a solo-run
              business offering custom PC builds, IT support, and brand design.
            </p>
            <p>
              I made a strategic decision to close it due to global economic factors—demonstrating
              long-term vision and financial responsibility.
            </p>
          </m.section>

          {/* Skills & Expertise */}
          <m.section variants={fadeInVariant} className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-heading text-gold">Skills & Expertise</h3>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm md:text-base lg:text-lg">
              <li>
                <span className="text-gold font-semibold">Frontend:</span> React, Tailwind CSS,
                JavaScript, HTML5/CSS3
              </li>
              <li>
                <span className="text-gold font-semibold">Backend & APIs:</span> Node.js,
                Discord.js, REST APIs, Wise Old Man API
              </li>
              <li>
                <span className="text-gold font-semibold">Database:</span> SQLite3, Data
                Optimization, Schema Migrations
              </li>
              <li>
                <span className="text-gold font-semibold">Design:</span> UI/UX Systems, Adobe
                Photoshop, Branding, Theming
              </li>
              <li>
                <span className="text-gold font-semibold">DevOps & Tools:</span> Git, VSCode,
                PostCSS, ESLint, Prettier
              </li>
            </ul>
          </m.section>

          {/* Mindset & Approach */}
          <m.section variants={fadeInVariant} className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-heading text-gold">How I Work</h3>
            <p>
              I think in systems, design with intention, and build autonomously. I bring a strong
              analytical mindset, deep pattern recognition, and a focus on modularity and
              scalability.
            </p>
            <p>
              My solutions aren’t just functional—they’re engineered for growth. I enforce
              structure, quality control, and provide automation wherever possible.
            </p>
          </m.section>

          {/* Call to Action */}
          <m.section variants={fadeInVariant} className="text-center">
            <h3 className="text-2xl md:text-3xl font-heading text-gold mb-4">Let’s Collaborate</h3>
            <p className="text-sm md:text-base mb-6 max-w-xl mx-auto">
              I'm open to remote roles in full-stack development, systems engineering, or Discord
              tech. Freelance contracts welcome. If you need structured, performant, and
              design-driven solutions—I'm the one who builds it.
            </p>
            <Link
              to="/contact"
              className="px-6 py-3 text-sm sm:text-base md:text-lg bg-gold text-dark font-bold rounded-full shadow hover:bg-accent transition duration-300">
              Contact Me
            </Link>
          </m.section>
        </m.section>
      </div>
    </LazyMotion>
  );
}
