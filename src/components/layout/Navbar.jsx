// 📂 src/components/layout/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { colorSchemes } from '../../utils/colorSchemes';

/**
 * @param {object} props
 * @param {string} props.colorScheme - Determines the color scheme for the navbar
 * @param ref
 */
function NavbarComponent({ colorScheme = 'gold' }, ref) {
  const { textColor, borderColor, backgroundColor } =
    colorSchemes[colorScheme] || colorSchemes.gold;

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = ['Home', 'Graphics', 'Development', 'Roadmap', 'About', 'Contact'];

  return (
    <nav
      ref={ref}
      className="fixed top-0 left-0 right-0 h-14 z-40 border-b flex items-center bg-dark border-gold justify-center transition-all duration-500"
      style={{ borderColor, backgroundColor }}>
      {/* Desktop Links */}
      <div className="hidden sm:flex h-full w-full max-w-6xl items-center justify-center">
        <div className="flex items-center justify-center gap-6 h-full transform translate-y-2">
          {navItems.map(item => (
            <Link
              key={item}
              to={`/${item === 'Home' ? '' : item.toLowerCase()}`}
              className="font-body font-semibold transition-all duration-300 hover:scale-110 text-base"
              style={{ color: textColor }}>
              {item}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="sm:hidden flex items-center justify-between w-full h-full px-4 transform translate-y-2">
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="text-accent"
          style={{ color: textColor }}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="sm:hidden fixed top-0 left-0 right-0 bottom-0 bg-dark bg-opacity-90 z-50 flex flex-col items-center justify-center gap-6"
          onClick={() => setMobileMenuOpen(false)}>
          {navItems.map(item => (
            <Link
              key={item}
              to={`/${item === 'Home' ? '' : item.toLowerCase()}`}
              className="font-body font-semibold text-lg hover:scale-105 hover:shadow"
              style={{ color: textColor === '#101010' ? '#ffffff' : textColor }}>
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

const Navbar = React.forwardRef(NavbarComponent);
export default Navbar;
