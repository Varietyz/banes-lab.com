// 📂 src/pages/Contact.jsx
import { FaEnvelope, FaLinkedin, FaGithub, FaDiscord } from 'react-icons/fa';
import ChatBox from '../components/chat/ChatBox'; // Adjust path if needed
import { LazyMotion, domAnimation, m, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import useInView from '../hooks/useInView';

// Animation variants
const fadeInVariant = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

/**
 *
 */
export default function Contact() {
  const channelId = '1356688841536442398';

  const widgets = [
    {
      icon: <FaDiscord className="text-[#5865F2] text-6xl mb-3" />,
      title: 'Discord Server',
      link: 'https://discord.gg/PzDknHV5Rd',
      style: 'bg-[#5865F2]/10 border-[#5865F2]'
    },
    {
      icon: <FaLinkedin className="text-[#0077B5] text-6xl mb-3" />,
      title: 'LinkedIn Profile',
      link: 'https://www.linkedin.com/in/jay-baleine',
      style: 'bg-[#0077B5]/10 border-[#0077B5]'
    },
    {
      icon: <FaGithub className="text-[#505050] text-6xl mb-3" />,
      title: 'GitHub Repositories',
      link: 'https://github.com/Varietyz?tab=repositories',
      style: 'bg-[#333]/10 border-[#505050]'
    },
    {
      icon: <FaEnvelope className="text-gold text-6xl mb-3" />,
      title: 'Direct Email',
      link: 'mailto:jay@banes-lab.com',
      style: 'bg-gold/10 border-gold'
    }
  ];

  // Setup in-view animation triggers
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <LazyMotion features={domAnimation}>
      <div className="h-screen overflow-y-auto no-scrollbar px-4 py-20 md:py-32 scroll-smooth">
        <m.section
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="max-w-4xl xl:max-w-6xl mx-auto border border-gold rounded-xl shadow-2xl p-8 sm:p-12 md:p-16 bg-dark/90 backdrop-blur-sm">
          <m.h2
            variants={fadeInVariant}
            className="text-4xl md:text-5xl lg:text-6xl font-heading text-gold text-center mb-4">
            Let&apos;s Connect
          </m.h2>
          <m.p variants={fadeInVariant} className="text-center text-lg text-white/75 mb-12">
            I&apos;m eager to discuss projects, opportunities, or collaborations.
          </m.p>

          {/* Contact Widgets */}
          <m.div
            variants={fadeInVariant}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {widgets.map((widget, i) => (
              <a
                key={i}
                href={widget.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center justify-center rounded-xl p-6 shadow-xl border ${widget.style} cursor-pointer hover:scale-105 transition-transform duration-300`}>
                {widget.icon}
                <h3 className="text-2xl font-semibold text-gold mt-4">{widget.title}</h3>
              </a>
            ))}
          </m.div>

          {/* ChatBox centered horizontally */}
          <m.div variants={fadeInVariant} className="flex justify-center">
            <ChatBox channelId={channelId} />
          </m.div>
        </m.section>
      </div>
    </LazyMotion>
  );
}
