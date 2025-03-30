// 📂 src/components/layout/Header.jsx

/**
 * @param {object} root0
 * @param {string} root0.colorScheme - Determines the color scheme for the header
 */
export default function Header({ colorScheme = 'gold' }) {
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
      backgroundColor: '#290f1a'
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
      backgroundColor: '#999999'
    }
  };

  // Fallback to gold if the provided colorScheme is not recognized
  const { textColor, borderColor, backgroundColor } =
    colorSchemes[colorScheme] || colorSchemes.gold;

  return (
    <header
      className="
        fixed 
        top-0 
        left-0 
        right-0 
        py-2
        px-4 
        shadow-xl 
        border-b 
        z-50
        transition-all duration-500
        
      "
      style={{ color: textColor, borderColor, backgroundColor }}>
      {/* Header content here */}
    </header>
  );
}
