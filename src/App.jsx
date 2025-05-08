import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
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
const LabAnalytics = lazy(() => import('./pages/LabAnalytics'));

const MembersList = lazy(() => import('./pages/clan/MembersList'));
const ClanHub = lazy(() => import('./pages/ClanHub'));
const Weekly = lazy(() => import('./pages/clan/Weekly'));
const Bingo = lazy(() => import('./pages/clan/Bingo'));
const Ranking = lazy(() => import('./pages/clan/Ranking'));
const HowToJoin = lazy(() => import('./pages/clan/HowToJoin'));
const Events = lazy(() => import('./pages/clan/Events'));
const Tutorials = lazy(() => import('./pages/clan/Tutorials'));
const Hiscores = lazy(() => import('./pages/clan/Hiscores'));
const Analytics = lazy(() => import('./pages/clan/Analytics'));

import 'github-markdown-css/github-markdown-dark.css'; // or github-markdown-light.css

// Component to handle dynamic Footer/Navbar/Header color and background image
/**
 *
 */
function AppContent() {
  const mainRef = useRef(null);
  const [showTopButton, setShowTopButton] = useState(false);
  const [footerHeight, setFooterHeight] = useState(0);
  //const [_isMdUp, setIsMdUp] = useState(window.innerWidth >= 768);
  const location = useLocation();
  const headerRef = useRef(null);
  const navbarRef = useRef(null);
  const footerRef = useRef(null);

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

  useEffect(() => {
    const node = mainRef.current;
    if (!node) return;

    const handleScroll = () => {
      const node = mainRef.current;
      const { scrollTop, scrollHeight, clientHeight } = node;
      const isScrollable = scrollHeight > clientHeight;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

      const scrolledFarEnough = scrollTop > 350;

      setShowTopButton(isScrollable && distanceFromBottom < 50 && scrolledFarEnough);
    };

    node.addEventListener('scroll', handleScroll);
    handleScroll(); // initialize on mount
    return () => node.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateLayoutPadding = () => {
      const headerHeight = headerRef.current?.clientHeight || 0;
      const navbarHeight = navbarRef.current?.clientHeight || 0;
      const footerHeight = footerRef.current?.clientHeight || 0;

      const topPad = headerHeight + navbarHeight + 20;
      const bottomPad = footerHeight + 60;

      if (mainRef.current) {
        mainRef.current.style.paddingTop = topPad + 'px';
        mainRef.current.style.paddingBottom = bottomPad + 'px';
      }

      setFooterHeight(footerHeight); // for scroll-to-top button
    };

    updateLayoutPadding();
    window.addEventListener('resize', updateLayoutPadding);
    return () => window.removeEventListener('resize', updateLayoutPadding);
  }, []);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'instant' }); // no animation
    }
    setShowTopButton(false); // hide button immediately
  }, [location.pathname]);

  const scrollToTop = () => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full min-h-screen">
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
      <Header colorScheme={colorScheme} ref={headerRef} />
      <Navbar colorScheme={colorScheme} ref={navbarRef} />
      <div className="flex flex-col min-h-screen min-w-[300px]">
        <main
          ref={mainRef}
          className="overflow-y-auto no-scrollbar scroll-smooth"
          style={{
            height: '100dvh', // ✅ critical for iOS 16+
            paddingTop: `${headerRef.current?.clientHeight + navbarRef.current?.clientHeight + 20 || 100}px`,
            paddingBottom: `${footerRef.current?.clientHeight + 30 || 110}px`,
            WebkitOverflowScrolling: 'touch'
          }}>
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-[50vh] text-gold text-center py-10">
                Loading...
              </div>
            }>
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
              <Route path="/lab-analytics" element={<LabAnalytics />} />

              <Route path="/varietyz-clan" element={<ClanHub />} />
              <Route path="/varietyz-clan/members" element={<MembersList />} />
              <Route path="/varietyz-clan/weekly" element={<Weekly />} />
              <Route path="/varietyz-clan/bingo" element={<Bingo />} />
              <Route path="/varietyz-clan/ranking" element={<Ranking />} />
              <Route path="/varietyz-clan/how-to-join" element={<HowToJoin />} />
              <Route path="/varietyz-clan/events" element={<Events />} />
              <Route path="/varietyz-clan/tutorials" element={<Tutorials />} />
              <Route path="/varietyz-clan/hiscores" element={<Hiscores />} />
              <Route path="/varietyz-clan/analytics" element={<Analytics />} />

              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/service" element={<TermsOfService />} />
              <Route path="/info" element={<SiteInfo />} />
            </Routes>
          </Suspense>
        </main>
        {/* Scroll to Top Button */}
        {/* instead of `bottom-4 md:bottom-8` on the wrapper, use an inline style */}
        <div
          className={`
    fixed
      left-1/2 transform -translate-x-1/2
      z-50 w-full px-4
      transition-all duration-300
      ${
        showTopButton ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }
  `}
          style={{ bottom: `${footerHeight - 10}px` }} // ← only change
        >
          <div className="max-w-6xl mx-auto flex justify-center">
            <button
              onClick={scrollToTop}
              className="
        bg-gold text-dark text-base font-bold
        px-10 py-2 shadow-lg hover:bg-accent/65
        transition-all duration-300 animate-bounce
        w-full sm:w-[800px] mx-auto
      "
              style={{ clipPath: 'polygon(50% 0, 50% 0, 100% 100%, 0 100%)' }}
              title="Back to Top">
              ↑ Back to Top
            </button>
          </div>
        </div>
      </div>
      <Footer colorScheme={colorScheme} ref={footerRef} />
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
