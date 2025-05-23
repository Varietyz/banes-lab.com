// 📂 src/pages/graphics/Droptracker.jsx
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { droptrackerFiles } from '../../data/graphicsData';
import { ArrowLeft } from 'lucide-react';

// Tag grouping
const colorTags = [
  'Red',
  'Blue',
  'Green',
  'Lime',
  'Yellow',
  'Pink',
  'Cyan',
  'Orange',
  'Purple',
  'Bronze',
  'Turqoise',
  'Night',
  'BlackWhite'
];
const styleTags = ['Rounded', 'Halfrounded', 'Square', 'RuneLite', 'OSRS', 'Rosey', 'Varietyz'];

// Extract tags from filenames
const extractTags = filename => {
  const base = filename
    .replace(/\.png$/, '')
    .replace('_Board', '')
    .replace(/^Full_/, '');
  return base.split('_').filter(Boolean);
};

// FullscreenViewer Component
/**
 *
 * @param root0
 * @param root0.selected
 * @param root0.onClose
 * @param root0.droptrackerFiles
 */
function FullscreenViewer({ selected, onClose, droptrackerFiles }) {
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
              : `${droptrackerFiles.basePath}/${selected}`
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
export default function Droptracker() {
  const [selected, setSelected] = useState(null);
  const [activeFilters, setActiveFilters] = useState({ colors: [], style: null });

  const toggleColor = tag => {
    setActiveFilters(prev => {
      const isActive = prev.colors.includes(tag);
      return {
        ...prev,
        colors: isActive ? prev.colors.filter(t => t !== tag) : [...prev.colors, tag]
      };
    });
  };

  const toggleStyle = tag => {
    setActiveFilters(prev => ({
      ...prev,
      style: prev.style === tag ? null : tag
    }));
  };

  const clearFilters = () => {
    setActiveFilters({ colors: [], style: null });
  };

  const matchesFilters = file => {
    const tags = extractTags(file);
    const matchesColor =
      activeFilters.colors.length === 0 || activeFilters.colors.some(t => tags.includes(t));
    const matchesStyle = !activeFilters.style || tags.includes(activeFilters.style);
    return matchesColor && matchesStyle;
  };

  const filteredFiles = droptrackerFiles.files
    .filter(matchesFilters)
    .filter(file => file !== 'Original_Board.png' && file !== 'Sample_Populated_Boards.png');

  const renderColorButtons = () => (
    <div className="flex flex-wrap gap-2">
      {colorTags.map(tag => {
        const isActive = activeFilters.colors.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => toggleColor(tag)}
            className={`px-3 py-1 text-sm font-semibold rounded-full border transition-all duration-200 ${
              isActive
                ? 'bg-gold text-dark'
                : 'bg-dark border-gold text-gold hover:bg-accent hover:text-dark'
            }`}>
            {tag}
          </button>
        );
      })}
    </div>
  );

  const renderStyleButtons = () => (
    <div className="flex flex-wrap gap-2">
      {styleTags.map(tag => {
        const isActive = activeFilters.style === tag;
        return (
          <button
            key={tag}
            onClick={() => toggleStyle(tag)}
            className={`px-3 py-1 text-sm font-semibold rounded-full border transition-all duration-200 ${
              isActive
                ? 'bg-gold text-dark'
                : 'bg-dark border-gold text-gold hover:bg-accent hover:text-dark'
            }`}>
            {tag}
          </button>
        );
      })}
    </div>
  );

  return (
    <section className="max-w-6xl mx-auto space-y-10">
      <div className="flex items-center gap-4">
        <Link to="/graphics" title="Back to Graphics Overview">
          <ArrowLeft size={36} className="text-gold hover:text-accent transition" />
        </Link>
        <h2 className="text-4xl font-heading text-gold">Droptracker UI Boards</h2>
      </div>
      {/* Fullscreen Viewer */}
      {selected && (
        <FullscreenViewer
          selected={selected}
          onClose={() => setSelected(null)}
          droptrackerFiles={droptrackerFiles}
        />
      )}
      {/* Showcase section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left: Text content */}
        <div className="space-y-4">
          <p className="text-base font-body text-white/80">
            <strong className="text-gold">Droptracker.io</strong> is a powerful RuneLite plugin that
            empowers Old School RuneScape players to visualize loot collection, manage dynamic
            tracker boards for team events like Bingo, and integrate customizable UI overlays that
            reflect clan identity. With themes ranging from rounded to square and even
            RuneLite-native styles.
          </p>
          <p className="text-base font-body text-white/70">
            Before my involvement, the visuals in Droptracker were far less refined. As the sole
            designer behind all the current boards, I (known as '<strong>Smoke</strong>' in the OSRS
            community) completely overhauled the plugin’s graphical and programmatic aesthetics. I
            introduced dynamic color schemes based on dominant hues with intelligent desaturation to
            ensure legibility, refined placement and scaling of UI elements, and implemented dynamic
            sprite loading for coin values that display multiple visual states. Every board and
            visual enhancement you see today is my original work, transforming Droptracker into a
            truly intuitive and visually captivating tool.
          </p>
        </div>

        {/* Right: Original board image */}
        <div className="w-full max-w-md mx-auto flex flex-col items-center transition-transform hover:scale-105  ">
          <img
            src="/assets/images/droptracker_io_ui/Original_Board.png"
            alt="Original Droptracker Board"
            className="rounded-lg shadow-md w-auto max-w-full object-contain scale-100 cursor-zoom-in"
            style={{ maxHeight: '420px' }}
            onClick={() => setSelected('Original_Board.png')}
          />
          <span className="mt-2 text-sm text-white/60 font-body text-center">
            <em>Original tracker board before redesign</em>
          </span>
        </div>
      </div>

      {/* Centered Sample Populated Boards image */}
      <div className="w-full flex flex-col items-center pt-6 transition-transform hover:scale-105">
        <img
          src="/assets/images/droptracker_io_ui/Sample_Populated_Boards.png"
          alt="Sample Populated Boards"
          className="rounded-lg shadow-md object-contain scale-100 cursor-zoom-in"
          style={{ maxHeight: '420px', maxWidth: '100%' }}
          onClick={() => setSelected('Sample_Populated_Boards.png')}
        />
        <span className="mt-2 text-sm text-white/60 font-body text-center">
          <em>Populated board with styled layout and sample data</em>
        </span>
      </div>

      <div className="space-y-2">
        <div className="text-gold font-heading text-lg">Colors</div>
        {renderColorButtons()}
        <div className="text-gold font-heading text-lg">Style</div>
        {renderStyleButtons()}
        {(activeFilters.colors.length || activeFilters.style) && (
          <button
            onClick={clearFilters}
            className="mt-2 px-4 py-2 text-sm font-semibold text-dark bg-gold rounded-full hover:bg-accent transition">
            Clear Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredFiles.map((file, i) => (
          <img
            key={i}
            src={`${droptrackerFiles.basePath}/${file}`}
            alt={file}
            loading="lazy"
            className="cursor-zoom-in transition-transform hover:scale-105 max-w-full"
            onClick={() => setSelected(file)}
          />
        ))}
      </div>
    </section>
  );
}
