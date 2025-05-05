// 📂 src/pages/graphics/Enigma.jsx
import { enigmaRoot } from '../../data/graphicsData';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Tag grouping
const tags = ['Avatar', 'Banner', 'Animated'];

// Extract tags from filenames by breaking them apart based on specific patterns
const extractTags = filename => {
  const name = filename.replace(/\.(png|gif|jpg|jpeg)$/, '');

  const tags = [];

  // Common tags based on filenames
  if (name.includes('banner')) tags.push('Banner');
  if (name.includes('logo')) tags.push('Avatar');
  if (name.includes('avatar')) tags.push('Avatar');
  if (name.includes('bingo')) tags.push('Event', 'Bingo', 'UI');
  if (name.includes('sotw')) tags.push('Event', 'SOTW');
  if (name.includes('template')) tags.push('Template', 'UI');
  if (name.includes('validated')) tags.push('Validated', 'UI');
  if (name.includes('mechanical')) tags.push('Mechanical');
  if (name.includes('botw')) tags.push('Event', 'BOTW');
  if (name.includes('main')) tags.push('Avatar');
  if (name.includes('animated')) tags.push('Animated');
  if (name.includes('Board')) tags.push('UI');
  if (name.includes('enigma_logo')) tags.push('Animated');

  return tags;
};

// FullscreenViewer Component
/**
 *
 * @param root0
 * @param root0.selected
 * @param root0.onClose
 * @param root0.droptrackerFiles
 * @param root0.enigmaRoot
 */
function FullscreenViewer({ selected, onClose, enigmaRoot }) {
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
              : `${enigmaRoot.basePath}/${selected}`
          }
          alt="Zoomed Fullscreen Image"
          draggable={false}
          onClick={e => e.stopPropagation()}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => setDragging(false)}
          onDoubleClick={handleDoubleClick}
          className={`object-contain transition-transform duration-300 max-w-full max-h-full ${
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
export default function Enigma() {
  const [selected, setSelected] = useState(null);
  const [showTopButton, setShowTopButton] = useState(false);
  const [activeTags, setActiveTags] = useState([]);
  const scrollRef = useRef(null);
  const [sortedFiles, setSortedFiles] = useState([]);

  useEffect(() => {
    const node = scrollRef.current;
    const fetchImageSizes = async () => {
      const fileDataPromises = enigmaRoot.files.map(file => {
        return new Promise(resolve => {
          const img = new Image();
          img.src = `${enigmaRoot.basePath}/${file}`;

          img.onload = () => {
            const aspectRatio = img.width / img.height;
            resolve({
              file,
              width: img.width,
              height: img.height,
              area: img.width * img.height,
              aspectRatio
            });
          };

          img.onerror = () => {
            resolve({
              file,
              width: 0,
              height: 0,
              area: 0,
              aspectRatio: 1
            });
          };
        });
      });

      const fileData = await Promise.all(fileDataPromises);

      // Exclude 'enigma_banner_animated.gif' from the gallery
      const filteredFiles = fileData.filter(item => item.file !== 'loading.gif');

      // Categorize images based on aspect ratio
      const wideBanners = filteredFiles
        .filter(img => img.aspectRatio >= 2)
        .sort((a, b) => b.area - a.area);
      const standardImages = filteredFiles
        .filter(img => img.aspectRatio > 0.5 && img.aspectRatio < 2)
        .sort((a, b) => b.area - a.area);
      const tallBanners = filteredFiles
        .filter(img => img.aspectRatio <= 0.5)
        .sort((a, b) => b.area - a.area);

      // Combine sorted groups
      const sorted = [...wideBanners, ...standardImages, ...tallBanners].map(item => item.file);

      setSortedFiles(sorted);
    };

    fetchImageSizes();
    if (!node) return;
    const handleScroll = () => setShowTopButton(node.scrollTop > 200);
    node.addEventListener('scroll', handleScroll);
    return () => node.removeEventListener('scroll', handleScroll);
  }, [enigmaRoot.files]);

  const toggleTag = tag => {
    setActiveTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
  };

  const clearTags = () => {
    setActiveTags([]);
  };

  const matchesTags = file => {
    const tags = extractTags(file);
    return activeTags.length === 0 || activeTags.some(tag => tags.includes(tag));
  };

  const filteredFiles = sortedFiles.filter(matchesTags);

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      ref={scrollRef}
      className="h-screen overflow-y-auto no-scrollbar px-4 py-20 md:py-32 scroll-smooth">
      <section className="max-w-6xl mx-auto space-y-10 px-4">
        {/* Header and Description Area */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="w-full lg:max-w-[55%]">
            {' '}
            {/* Adjusted the width to match the image */}
            <div className="flex items-center gap-4">
              <Link to="/graphics" title="Back to Graphics Overview">
                <ArrowLeft size={36} className="text-gold hover:text-accent transition" />
              </Link>
              <h2 className="text-4xl font-heading text-gold">Enigma Graphics</h2>
            </div>
            <div className="space-y-4 text-lg font-body text-white/80 mt-4">
              <p>
                The <span className="text-gold">Enigma</span> visuals are a showcase of my work for
                an <span className="text-gold">Amateur Esport Organization</span> I used to run
                online. These branded graphics were designed to establish a cohesive, professional
                identity across the team's website, social media, and competitive events.
              </p>
              <p>
                The color palette mirrors the <span className="text-gold">Varietyz</span> style with
                the same bold <span className="text-gold">gold (#cea555)</span> and deep{' '}
                <span className="text-gold">dark (#101010)</span> contrast, symbolizing prestige,
                ambition, and excellence. The graphics aim to capture the organization's competitive
                spirit, featuring dynamic banners, logos, event graphics, and animated visuals to
                enhance the brand’s presence.
              </p>
              <p className="text-sm italic text-white/70">
                The <span className="text-gold">Alfa Bravo</span> graphic was originally designed by
                their team, but I took the initiative to animate it and sent it over. They ended up
                adopting it as their official display avatar, recognizing the added impact and
                fluidity it brought to their branding.
              </p>
            </div>
          </div>

          {/* Display Animated Banner */}
          <div className="w-full lg:max-w-[40%] flex justify-center transition-transform">
            {' '}
            {/* Matching width for consistency */}
            <img
              src={`${enigmaRoot.basePath}/loading.gif`}
              alt="Enigma Animated Loading"
              className="rounded-xl shadow-md border border-gold max-w-full"
              onClick={() => setSelected('loading.gif')}
            />
          </div>
        </div>

        {/* Fullscreen Viewer */}
        {selected && (
          <FullscreenViewer
            selected={selected}
            onClose={() => setSelected(null)}
            enigmaRoot={enigmaRoot}
          />
        )}

        {/* Tag Filters */}
        <div className="space-y-4">
          <div className="text-gold font-heading text-lg">Filter Tags</div>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 text-sm font-semibold rounded-full border transition-all duration-200 ${
                  activeTags.includes(tag)
                    ? 'bg-gold text-dark'
                    : 'bg-dark border-gold text-gold hover:bg-accent hover:text-dark'
                }`}>
                {tag}
              </button>
            ))}
          </div>
          {activeTags.length > 0 && (
            <button
              onClick={clearTags}
              className="mt-2 px-4 py-2 text-sm font-semibold text-dark bg-gold rounded-full hover:bg-accent transition">
              Clear Filters
            </button>
          )}
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFiles.map((file, i) => (
            <div
              key={i}
              className="flex items-center justify-center cursor-zoom-in transition-transform hover:scale-105"
              onClick={() => setSelected(file)}>
              <img
                src={`${enigmaRoot.basePath}/${file}`}
                alt={file}
                className="object-contain mx-auto rounded-md"
                loading="lazy"
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
              className="bg-gold text-dark text-base font-bold px-10 py-2 shadow-lg hover:bg-accent/65 transition-all duration-300 animate-bounce w-full sm:w-[800px] mx-auto"
              style={{ clipPath: 'polygon(50% 0, 50% 0, 100% 100%, 0 100%)' }}
              title="Back to Top">
              ↑ Back to Top
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
