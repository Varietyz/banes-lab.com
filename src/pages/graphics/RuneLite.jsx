import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { runeliteTheme, varietyzDeluxe } from '../../data/graphicsData';
import { ArrowLeft, Loader2 } from 'lucide-react';

import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';

// Define tags and sizes
const tags = [
  'Account Management',
  'Advanced Options',
  'Bank',
  'Bonds Pouch',
  'Button',
  'Chatbox',
  'Clans Tab',
  'Combat',
  'Cross Sprites',
  'Emote',
  'Equipment',
  'Fixed Mode',
  'Grand Exchange',
  'Login Screen',
  'Options',
  'Other',
  'Prayer',
  'Resizable Mode',
  'Scrollbar',
  'Skill',
  'Stats',
  'Tab',
  'Welcome Screen',
  'Game Screenshots'
];
// Extract tags based on folder names
const extractTags = filePath => {
  const folderMatch = filePath.match(/^([^\\/]+)\//);
  if (!folderMatch) return [];

  // Convert folder name to a human-readable tag
  const folderName = folderMatch[1].replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

  // Return the tag only if it matches one from your `tags` array
  return tags.includes(folderName) ? [folderName] : [];
};

/**
 *
 * @param root0
 * @param root0.selected
 * @param root0.onClose
 * @param root0.osrsVarietyz
 * @param root0.themeData
 */
function FullscreenViewer({ selected, onClose, themeData }) {
  const [zoomed, setZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0, time: 0 });

  // Thresholds to distinguish a click from a drag.
  const dragThreshold = 5; // pixels
  const clickTimeout = 200; // milliseconds

  const handlePointerDown = e => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStart.current = { x: e.clientX, y: e.clientY, time: Date.now() };
    if (zoomed) {
      setDragging(true);
      setOrigin({ x: e.clientX, y: e.clientY });
    }
  };

  const handlePointerMove = e => {
    if (!dragging) return;
    const dx = e.clientX - origin.x;
    const dy = e.clientY - origin.y;
    setPosition(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    setOrigin({ x: e.clientX, y: e.clientY });
  };

  const handlePointerUp = e => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    const dx = Math.abs(e.clientX - dragStart.current.x);
    const dy = Math.abs(e.clientY - dragStart.current.y);
    const dt = Date.now() - dragStart.current.time;

    // Toggle zoom only if the pointer interaction qualifies as a click.
    if (dx < dragThreshold && dy < dragThreshold && dt < clickTimeout) {
      setZoomed(prev => {
        if (prev) setPosition({ x: 0, y: 0 }); // Reset pan when unzooming.
        return !prev;
      });
    }
    setDragging(false);
  };

  const handleDoubleClick = () => {
    // Double-click resets zoom and pan.
    setZoomed(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    // Overlay covers the full viewport.
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
      onClick={onClose} // Clicks outside the image close the viewer.
    >
      {/* 
        The container below wraps the image and is sized to the image's display area.
        It stops click propagation so that interactions on the image do not trigger closing.
      */}
      <div onClick={e => e.stopPropagation()} className="relative">
        <img
          src={
            selected === 'Original_Board.png' || selected === 'Sample_Populated_Boards.png'
              ? `/assets/images/droptracker_io_ui/${selected}`
              : `${themeData.basePath}/${selected}`
          }
          alt="Zoomed Fullscreen Image"
          draggable={false}
          onClick={e => e.stopPropagation()}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => setDragging(false)}
          onDoubleClick={handleDoubleClick}
          className={`object-contain transition-transform duration-300 ${
            zoomed ? 'cursor-grab' : 'cursor-zoom-in'
          }`}
          style={{
            // When not zoomed, constrain the image to 80% of the viewport.
            maxWidth: zoomed ? 'none' : '80vw',
            maxHeight: zoomed ? 'none' : '80vh',
            transform: zoomed
              ? `scale(2) translate(${position.x / 2}px, ${position.y / 2}px)`
              : 'scale(1)',
            transition: dragging ? 'none' : 'transform 0.3s ease',
            userSelect: 'none'
          }}
        />
      </div>
    </div>
  );
}

/**
 *
 */
export default function RuneLite() {
  const [selected, setSelected] = useState(null);
  const [activeTags, setActiveTags] = useState([]);
  const [currentTheme, setCurrentTheme] = useState('runeliteTheme');
  const [sortedFiles, setSortedFiles] = useState([]);
  const [activeSize] = useState('');
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const themeData = currentTheme === 'runeliteTheme' ? runeliteTheme : varietyzDeluxe;
  const cooldownRef = useRef(false);
  const scrollRef = useRef(null);
  const [showTopButton, setShowTopButton] = useState(false);
  const [showOverlay] = useState(true);

  const toggleTag = tag =>
    setActiveTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));

  const handleThemeToggle = () => {
    if (cooldown || loading) return; // Prevent action if cooldown or loading is active

    setLoading(true);
    setCooldown(true);

    // ✅ Immediately switch the theme
    setCurrentTheme(prev => (prev === 'runeliteTheme' ? 'varietyzDeluxe' : 'runeliteTheme'));

    // ⏳ Continue showing the loading animation for 1.5 seconds for visual feedback
    setTimeout(() => {
      setLoading(false); // Stop the animation after 1.5 seconds
    }, 1500);

    // 🔒 Apply a 3-second cooldown to prevent spam-clicking
    setTimeout(() => {
      setCooldown(false); // Allow button interaction again
    }, 1600);
  };

  useEffect(() => {
    const node = scrollRef.current;

    const fetchImageSizes = async () => {
      const fileDataPromises = themeData.files.map(
        file =>
          new Promise(resolve => {
            const img = new Image();
            img.src = `${themeData.basePath}/${file}`;
            img.onload = () => {
              const area = img.width * img.height;
              const sizeCategory = area > 500000 ? 'Large' : area > 100000 ? 'Medium' : 'Small';
              resolve({ file, area, sizeCategory });
            };
            img.onerror = () => resolve({ file, area: 0, sizeCategory: 'Small' });
          })
      );

      const fileData = await Promise.all(fileDataPromises);
      const sorted = fileData.sort((a, b) => b.area - a.area).map(item => item.file);
      setSortedFiles(sorted);
    };

    fetchImageSizes();

    if (!node) return;

    if (cooldownRef.current) clearTimeout(cooldownRef.current);

    const handleScroll = () => setShowTopButton(node.scrollTop > 450);
    node.addEventListener('scroll', handleScroll);

    return () => {
      node.removeEventListener('scroll', handleScroll);
    };
  }, [themeData]);

  const clearTags = () => {
    setActiveTags([]);
  };

  const filteredFiles = sortedFiles.filter(file => {
    const fileTags = extractTags(file);
    const matchesTags = activeTags.length === 0 || activeTags.some(tag => fileTags.includes(tag));
    const matchesSize =
      activeSize === '' || themeData.files.find(f => f === file)?.sizeCategory === activeSize;

    return matchesTags && matchesSize;
  });
  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div
      ref={scrollRef}
      className="h-screen overflow-y-auto no-scrollbar px-4 py-20 md:py-32 scroll-smooth relative">
      <Header colorScheme="light" />
      <Navbar colorScheme="light" />
      {/* 🔥 Background Layer */}
      <div className="fixed inset-0 -z-20 bg-[url('/assets/images/Background_light.png')] bg-cover bg-center"></div>

      {/* 🔥 Dimming Layer */}
      <div
        className={`fixed inset-0 -z-10 transition-opacity  ${showOverlay ? 'bg-gray-200/45' : 'bg-transparent'}`}
      />
      <section className="max-w-6xl mx-auto space-y-8 px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 ">
          {/* Header */}
          <div className="text-center">
            {/* Header Section */}
            <div className="grid grid-cols-[auto,1fr,auto] items-center gap-4 mb-1">
              {/* Back Arrow */}
              <Link to="/graphics" title="Back to Graphics Overview">
                <ArrowLeft size={36} className="text-black hover:text-accent transition" />
              </Link>
              {/* Centered Header Text */}
              <h2 className="text-4xl font-heading text-black">{'OSRS Theme Packs'}</h2>
              {/* Placeholder equal to the back arrow size */}
              <div className="w-[36px]" />
            </div>

            {/* Divider */}
            <hr className="border-t border-dark pb-1 w-3/4 mx-auto" />

            {/* Toggle Button Section */}
            <div className="flex items-center justify-center space-x-2 transform -translate-y-1 transition-all duration-300 hover:scale-105">
              {/* RuneLite Theme Button */}
              <button
                onClick={() => handleThemeToggle('runeliteTheme')}
                disabled={loading || cooldown}
                className={`transition-all duration-300 ${
                  currentTheme === 'runeliteTheme'
                    ? 'text-black text-lg sm:text-xl font-bold opacity-100'
                    : 'text-black/70 text-sm sm:text-base'
                }`}>
                RuneLite Theme
              </button>

              {/* Placeholder for consistent spacing and loading spinner position */}
              <div className="relative w-[18px] h-[18px]">
                {loading && (
                  <Loader2
                    className="animate-spin text-black absolute inset-0 transition-opacity duration-300 opacity-100"
                    size={20}
                  />
                )}
              </div>

              {/* Varietyz Deluxe Button */}
              <button
                onClick={() => handleThemeToggle('varietyzDeluxe')}
                disabled={loading || cooldown}
                className={`transition-all duration-300 ${
                  currentTheme === 'varietyzDeluxe'
                    ? 'text-black text-lg sm:text-xl font-bold opacity-100'
                    : 'text-black/70 text-sm sm:text-base'
                }`}>
                Varietyz Deluxe
              </button>
            </div>
          </div>
        </div>

        {/* Header and Description Area */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-6">
          {/* Description */}
          <div className="w-full lg:max-w-[45%]  px-4 sm:px-6 space-y-4 text-sm sm:text-base lg:text-lg font-body text-shadow-md ">
            <p>
              {currentTheme === 'runeliteTheme'
                ? 'Sleek, dark UI built to enhance the RuneLite visual experience. Ideal for low-light environments and providing sharp contrast for better visibility.'
                : 'A luxurious theme with rich gold accents and elegant borders, providing a premium, high-quality user interface for RuneLite enthusiasts.'}
            </p>
            <p className="font-body text-white text-xs italic">
              These themes are designed to be applied through the{' '}
              <span className="text-black font-semibold">Resource Packs Plugin</span> on RuneLite.
              Simply drag and drop the folders path into the plugin’s configuration panel or install
              from the plugin's hub to customize your game experience.
            </p>
          </div>

          {/* Display Icon */}
          <div className="flex items-center justify-center max-w-[300px] w-full h-auto">
            <img
              src={`${themeData.basePath}/icon.png`}
              alt="Theme Icon"
              className="w-full h-auto max-h-[300px] object-contain  transition-transform "
              onClick={() => setSelected('icon.png')}
            />
          </div>
        </div>

        {/* Fullscreen Viewer */}
        {selected && (
          <FullscreenViewer
            selected={selected}
            onClose={() => setSelected(null)}
            themeData={themeData}
          />
        )}

        {/* Tag Filters */}
        <div className="space-y-4">
          <div className="text-black font-heading text-lg">Filter Tags</div>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 text-sm font-semibold rounded-full border transition-all duration-200 ${
                  activeTags.includes(tag)
                    ? 'bg-black text-white'
                    : 'bg-[#999999] border-dark text-dark hover:bg-dark hover:text-white'
                }`}>
                {tag}
              </button>
            ))}
          </div>
          {activeTags.length > 0 && (
            <button
              onClick={clearTags}
              className="mt-2 px-4 py-2 text-sm font-semibold text-white bg-dark rounded-full hover:bg-dark transition">
              Clear Filters
            </button>
          )}
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredFiles.map((file, i) => (
            <div
              key={i}
              className="flex items-center justify-center cursor-zoom-in transition-transform hover:scale-105"
              onClick={() => setSelected(file)}>
              <img
                src={`${themeData.basePath}/${file}`}
                alt={file}
                loading="lazy"
                className="object-contain mx-auto rounded-lg max-w-full h-auto"
              />
            </div>
          ))}
        </div>

        {/* Scroll to Top Button */}
        <div
          className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-full px-4 sm:px-6 lg:px-8 transition-all duration-300
    ${showTopButton ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}
  `}>
          <div className="max-w-6xl mx-auto flex justify-center">
            <button
              onClick={scrollToTop}
              className="bg-dark text-white text-base font-bold px-10 py-2 shadow-lg hover:bg-dark/65 transition-all duration-300 animate-bounce w-full sm:w-[800px] mx-auto"
              style={{ clipPath: 'polygon(50% 0, 50% 0, 100% 100%, 0 100%)' }}
              title="Back to Top">
              ↑ Back to Top
            </button>
          </div>
        </div>
      </section>
      <Footer colorScheme="light" />
    </div>
  );
}
