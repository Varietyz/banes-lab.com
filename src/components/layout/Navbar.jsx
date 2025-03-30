// 📂 src/components/layout/Navbar.jsx
import { Link } from 'react-router-dom';

/**
 * @param {object} root0
 * @param {string} root0.colorScheme - Determines the color scheme for the navbar
 */
export default function Navbar({ colorScheme = 'gold' }) {
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

  return (
    <nav
      className="
        fixed
        top-5
        left-0
        right-0
        h-10
        border-b
        z-40
        flex
        items-center
        justify-center
        transition-all duration-500
        
      "
      style={{ borderColor, backgroundColor }}>
      {/* Navbar links */}
      {['Home', 'Graphics', 'Development', 'Roadmap', 'About', 'Contact'].map(item => (
        <Link
          key={item}
          to={`/${item === 'Home' ? '' : item.toLowerCase()}`}
          className="font-body font-semibold mx-4 transition-all duration-300 hover:scale-110"
          style={{ color: textColor }}>
          {item}
        </Link>
      ))}
    </nav>
  );
}
