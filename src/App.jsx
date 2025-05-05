import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

const Home = lazy(() => import('./pages/Home'));
const Graphics = lazy(() => import('./pages/graphics/Graphics'));
const Development = lazy(() => import('./pages/Development'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Roadmap = lazy(() => import('./pages/Roadmap'));
const Varietyz = lazy(() => import('./pages/graphics/Varietyz'));
const Enigma = lazy(() => import('./pages/graphics/Enigma'));
const Droptracker = lazy(() => import('./pages/graphics/Droptracker'));
const RuneLite = lazy(() => import('./pages/graphics/RuneLite'));
const Logos = lazy(() => import('./pages/graphics/Logos'));
const RoseyRS = lazy(() => import('./pages/graphics/Roseyrs'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const SiteInfo = lazy(() => import('./pages/SiteInfo'));

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
    runelite: {
      scheme: 'light',
      bgImage: '/assets/images/Background_light.png'
    }
  };

  // Determine color scheme and background image based on the current path
  const getColorScheme = () => {
    if (currentPath.includes('/graphics/roseyrs')) return colorSchemes.roseyrs;
    if (currentPath.includes('/graphics/runelite')) return colorSchemes.runelite;
    return colorSchemes.default;
  };

  const { scheme: colorScheme, bgImage } = getColorScheme();

  const cspNonce = document.querySelector('meta[name="csp-nonce"]').getAttribute('content');

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image changes based on the theme */}
      <div>
        <script nonce={cspNonce} src="https://cdn.jsdelivr.net/npm/emoji-picker-react"></script>
        <style nonce={cspNonce}>{`
    body {
      background-color: #101010;
    }
    .dynamic-bg {
  background-image: url(${bgImage}) !important;
}

  `}</style>
      </div>

      <div className="absolute inset-0 bg-dark bg-cover bg-center scale-110 pointer-events-none -z-10 dynamic-bg" />

      <div className="flex flex-col min-h-screen  ">
        <Header colorScheme={colorScheme} />
        <Navbar colorScheme={colorScheme} />
        <main
          className="
          absolute
          left-0
          right-0    
          overflow-y-auto
          no-scrollbar
          
        ">
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

            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/service" element={<TermsOfService />} />
            <Route path="/info" element={<SiteInfo />} />
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
