// 📂 src/components/layout/Footer.jsx
import React, { useState, useEffect } from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { FaDiscord, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { colorSchemes } from '../../utils/colorSchemes';

/**
 * @param {object} props
 * @param {string} props.colorScheme - Determines the color scheme for the footer
 * @param ref
 */
function FooterComponent({ colorScheme = 'gold' }, ref) {
  const [setIsLargeScreen] = useState(window.innerWidth >= 1024);

  const { textColor, borderColor, backgroundColor } =
    colorSchemes[colorScheme] || colorSchemes.gold;

  const socialLinks = [
    { name: 'Email', icon: <FaEnvelope />, link: 'mailto:jay@banes-lab.com' },
    { name: 'Discord', icon: <FaDiscord />, link: 'https://discord.com/users/406828985696387081' },
    { name: 'GitHub', icon: <FaGithub />, link: 'https://github.com/Varietyz' },
    { name: 'LinkedIn', icon: <FaLinkedin />, link: 'https://www.linkedin.com/in/jay-baleine/' }
  ];

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const leftIcons = socialLinks.slice(0, 2);
  const rightIcons = socialLinks.slice(2);

  return (
    <LazyMotion features={domAnimation}>
      <m.footer
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="
          fixed bottom-0 left-0 right-0
          py-1 bg-dark border-t border-gold shadow-md z-50
          flex flex-wrap items-center justify-center gap-x-4 duration-500
          px-4 sm:px-8
        "
        style={{
          borderTop: `1px solid ${borderColor}`,
          backgroundColor: backgroundColor
        }}>
        <div className="flex items-center gap-3 order-1">
          {leftIcons.map((social, idx) => (
            <m.a
              key={idx}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="
                w-8 h-8 flex items-center text-gold justify-center
                rounded-full transition-all duration-300
              "
              style={{ color: textColor }}>
              {social.icon}
            </m.a>
          ))}
        </div>

        <p
          className="
            text-sm text-gold font-body text-center
            order-3 w-full sm:w-auto
          "
          style={{ color: textColor }}>
          &copy; {new Date().getFullYear()} Bane's Lab. All Rights Reserved.
        </p>

        {rightIcons.length > 0 && (
          <div className="flex items-center gap-3 order-2 sm:order-4">
            {rightIcons.map((social, idx) => (
              <m.a
                key={idx}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="
                  w-8 h-8 flex items-center text-gold justify-center
                  rounded-full transition-all duration-300
                "
                style={{ color: textColor }}>
                {social.icon}
              </m.a>
            ))}
          </div>
        )}
      </m.footer>
    </LazyMotion>
  );
}

const Footer = React.forwardRef(FooterComponent);
export default Footer;
