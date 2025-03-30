import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Graphics from './pages/graphics/Graphics';
import Development from './pages/Development';
import About from './pages/About';
import Contact from './pages/Contact';
import Roadmap from './pages/Roadmap';
import Varietyz from './pages/graphics/Varietyz';
import Enigma from './pages/graphics/Enigma';
import Droptracker from './pages/graphics/Droptracker';
import RuneLite from './pages/graphics/RuneLite';
import Logos from './pages/graphics/Logos';
import RoseyRS from './pages/graphics/Roseyrs';

import 'github-markdown-css/github-markdown-dark.css'; // or github-markdown-light.css

// Component to handle dynamic Footer/Navbar/Header color and background image
/**
 *
 */
function AppContent() {
  const location = useLocation();

  // Determine the current path
  const currentPath = location.pathname;

  // Define color schemes and background images for specific pages
  const colorSchemes = {
    default: { scheme: 'gold', bgImage: '/assets/images/Background.png' },
    roseyrs: { scheme: 'pink', bgImage: '/assets/images/Background_rosey.png' },
    runelite: { scheme: 'light', bgImage: '/assets/images/Background_light.png' }
  };

  // Determine color scheme and background image based on the current path
  const getColorScheme = () => {
    if (currentPath.includes('/graphics/roseyrs')) return colorSchemes.roseyrs;
    if (currentPath.includes('/graphics/runelite')) return colorSchemes.runelite;
    return colorSchemes.default;
  };

  const { scheme: colorScheme, bgImage } = getColorScheme();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image changes based on the theme */}
      <div
        className="absolute inset-0 bg-dark bg-cover bg-center scale-110 pointer-events-none -z-10"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header colorScheme={colorScheme} />
        <Navbar colorScheme={colorScheme} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/graphics" element={<Graphics />} />
            <Route path="/graphics/varietyz" element={<Varietyz />} />
            <Route path="/graphics/enigma" element={<Enigma />} />
            <Route path="/graphics/logos" element={<Logos />} />
            <Route path="/graphics/roseyrs" element={<RoseyRS />} />
            <Route path="/graphics/runelite" element={<RuneLite />} />
            <Route path="/graphics/droptracker" element={<Droptracker />} />

            <Route path="/development" element={<Development />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer colorScheme={colorScheme} />
      </div>
    </div>
  );
}

/**
 * App Wrapper with Router
 */
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
