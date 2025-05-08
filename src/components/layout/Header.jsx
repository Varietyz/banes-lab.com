// 📂 src/components/layout/Header.jsx
import React from 'react';
import { colorSchemes } from '../../utils/colorSchemes';

/**
 * @param {object} props
 * @param {string} props.colorScheme - Determines the color scheme for the header
 * @param ref
 */
function HeaderComponent({ colorScheme = 'gold' }, ref) {
  const { textColor, borderColor, backgroundColor } =
    colorSchemes[colorScheme] || colorSchemes.gold;

  return (
    <header
      ref={ref}
      className="
        fixed 
        top-0 
        left-0 
        right-0 
        py-2
        px-4 
        shadow-xl 
        border-b 
        text-gold
        bg-accent
        border-gold
        z-50
        transition-all duration-500
      "
      style={{ color: textColor, borderColor, backgroundColor }}>
      {/* Header content here */}
    </header>
  );
}

const Header = React.forwardRef(HeaderComponent);
export default Header;
