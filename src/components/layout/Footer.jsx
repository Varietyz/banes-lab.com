// 📂 src/components/layout/Footer.jsx
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { FaDiscord, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

/**
 * @param {object} root0
 * @param {string} root0.colorScheme - Determines the color scheme for the footer
 */
export default function Footer({ colorScheme = 'gold' }) {
  // Define different color schemes
  const colorSchemes = {
    gold: {
      textColor: '#cea555',
      borderColor: '#cea555',
      backgroundColor: '#101010'
    },
    pink: {
      textColor: '#D66894',
      borderColor: '#D66894',
      backgroundColor: '#101010'
    },
    blue: {
      textColor: '#5DADE2',
      borderColor: '#5DADE2',
      backgroundColor: '#0a1d37'
    },
    green: {
      textColor: '#27AE60',
      borderColor: '#27AE60',
      backgroundColor: '#102a12'
    },
    purple: {
      textColor: '#9B59B6',
      borderColor: '#9B59B6',
      backgroundColor: '#1a0b26'
    },
    light: {
      textColor: '#101010',
      borderColor: '#101010',
      backgroundColor: '#E5E7EB'
    }
  };

  // Fallback to gold if the provided colorScheme is not recognized
  const { textColor, borderColor, backgroundColor } =
    colorSchemes[colorScheme] || colorSchemes.gold;

  const socialLinks = [
    { name: 'Email', icon: <FaEnvelope />, link: 'mailto:jay@banes-lab.com' },
    { name: 'Discord', icon: <FaDiscord />, link: 'https://discord.com/users/406828985696387081' },
    { name: 'GitHub', icon: <FaGithub />, link: 'https://github.com/Varietyz' },
    { name: 'LinkedIn', icon: <FaLinkedin />, link: 'https://www.linkedin.com/in/jay-baleine/' }
  ];

  return (
    <LazyMotion features={domAnimation}>
      <m.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="
          fixed
          bottom-0
          left-0
          right-0
          py-2.5
          shadow-md
          z-50
          flex
          items-center
          px-8
          justify-between
          transition-all duration-500
        "
        style={{
          borderTop: `1px solid ${borderColor}`,
          backgroundColor: backgroundColor
        }}>
        {/* Social Icons - Left */}
        <div className="flex gap-4">
          {socialLinks.map((social, index) => (
            <m.a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="text-2xl"
              style={{ color: textColor }}>
              {social.icon}
            </m.a>
          ))}
        </div>

        {/* Copyright Text - Centered */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <p className="text-sm font-body" style={{ color: textColor }}>
            &copy; {new Date().getFullYear()} Bane's Lab. All Rights Reserved.
          </p>
        </div>
      </m.footer>
    </LazyMotion>
  );
}
