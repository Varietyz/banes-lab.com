// 📂 src/components/layout/Navbar.jsx
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav
      className="
        fixed
        top-5
        left-0
        right-0
        h-10
        bg-dark
        border-b
        border-gold
        z-40
        flex
        items-center
        justify-center
      ">
      {/* Navbar links, etc. */}
      {['Home', 'Graphics', 'Development', 'Roadmap', 'About', 'Contact'].map(item => (
        <Link
          key={item}
          to={`/${item === 'Home' ? '' : item.toLowerCase()}`}
          className="text-gold hover:text-accent font-body font-semibold mx-4">
          {item}
        </Link>
      ))}
    </nav>
  );
}
