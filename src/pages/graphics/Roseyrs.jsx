// 📂 src/pages/graphics/RoseyRS.jsx
import { osrsRoseyrs } from '../../data/graphicsData';

// 📂 src/pages/graphics/RoseyRS.jsx
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Tag grouping
const tags = ['UI', 'Logo', 'Banner', 'Event', 'Animated'];

// Extract tags from filenames by breaking them apart based on specific patterns
const extractTags = filename => {
  const name = filename.replace(/\.(png|gif|jpg|jpeg)$/, '');

  const tags = [];

  // Common tags based on filenames
  if (name.includes('banner')) tags.push('Banner');
  if (name.includes('logo')) tags.push('Logo');
  if (name.includes('avatar')) tags.push('Avatar');
  if (name.includes('bingo')) tags.push('Event', 'Bingo', 'UI');
  if (name.includes('sotw')) tags.push('Event', 'SOTW');
  if (name.includes('template')) tags.push('Template', 'UI');
  if (name.includes('validated')) tags.push('Validated', 'UI');
  if (name.includes('mechanical')) tags.push('Mechanical');
  if (name.includes('botw')) tags.push('Event', 'BOTW');
  if (name.includes('roseyrs')) tags.push('RoseyRS');
  if (name.includes('animated')) tags.push('Animated');
  if (name.includes('Board')) tags.push('UI');
  if (name.includes('roseyrs_logo')) tags.push('Animated');

  return tags;
};

// FullscreenViewer Component
/**
 *
 * @param root0
 * @param root0.selected
 * @param root0.onClose
 * @param root0.droptrackerFiles
 * @param root0.osrsRoseyrs
 */
function FullscreenViewer({ selected, onClose, osrsRoseyrs }) {
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
            selected === 'Rosey_Logo_animated.gif' || selected === 'Rosey_Logo_animated.gif'
              ? `/assets/images/roseyrs/${selected}`
              : `${osrsRoseyrs.basePath}/${selected}`
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
export default function RoseyRS() {
  const [selected, setSelected] = useState(null);
  const [activeTags, setActiveTags] = useState([]);
  const scrollRef = useRef(null);
  const [sortedFiles, setSortedFiles] = useState([]);

  useEffect(() => {
    const node = scrollRef.current;
    const fetchImageSizes = async () => {
      const fileDataPromises = osrsRoseyrs.files.map(file => {
        return new Promise(resolve => {
          const img = new Image();
          img.src = `${osrsRoseyrs.basePath}/${file}`;

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

      // Exclude 'roseyrs_banner_animated.gif' from the gallery
      const filteredFiles = fileData.filter(item => item.file !== 'Rosey_Logo_animated.gif');

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
    return () => {};
  }, [osrsRoseyrs.files]);

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

  return (
    <section className="max-w-6xl mx-auto space-y-5 px-4">
      {/* Header and Description Area */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-6">
        <div className="w-full lg:max-w-[45%] space-y-4 text-base font-body text-white mt-2 leading-relaxed">
          {' '}
          {/* Adjusted the width to match the image */}
          <div className="flex items-center gap-4">
            <Link to="/graphics" title="Back to Graphics Overview">
              <ArrowLeft size={36} className="text-rosey hover:text-rosey transition" />
            </Link>
            <h2 className="text-4xl font-heading text-rosey">RoseyRS Graphics</h2>
          </div>
          <div className="space-y-4 text-lg font-body text-white/80 mt-4">
            <div className="space-y-4 text-base font-body text-white mt-2 leading-relaxed">
              <p>
                The <span className="text-rosey font-bold">RoseyRS</span> visuals are crafted with a
                refined elegance that blends creativity, cohesion, and premium presentation.
                Designed with a rich palette of{' '}
                <span className="text-rosey">
                  Rosey Pink (#D66894), Deep Purple (#512A43), Charcoal Black (#222222)
                </span>
                , the visual identity embodies a perfect balance of sophistication and modern
                appeal.
              </p>
              <p>
                This entire collection, including logos, banners, event art, and animated assets,
                was created solely by me to establish a consistent and high-quality aesthetic for{' '}
                <span className="text-rosey font-bold">RoseyRS</span>. From conceptualization to
                execution, each piece is designed to enhance the user experience through meticulous
                attention to alignment, sharp detail, and a polished finish.
              </p>
              <p>
                These graphics serve various purposes, from promotional materials and social media
                presence to community engagement and branding consistency. Every asset reflects the
                brand's distinctive style, ensuring seamless integration across platforms.
              </p>
            </div>
          </div>
        </div>

        {/* Display Animated Banner */}
        <div className="w-full lg:w-[35%] flex justify-center transition-transform mt-6 lg:mt-0">
          {' '}
          {/* Matching width for consistency */}
          <img
            src={`${osrsRoseyrs.basePath}/Rosey_Logo_animated.gif`}
            alt="RoseyRS Animated Banner"
            className="rounded-lg  max-w-full"
            onClick={() => setSelected('Rosey_Logo_animated.gif')}
          />
        </div>
      </div>

      {/* Fullscreen Viewer */}
      {selected && (
        <FullscreenViewer
          selected={selected}
          onClose={() => setSelected(null)}
          osrsRoseyrs={osrsRoseyrs}
        />
      )}

      {/* Tag Filters */}
      <div className="space-y-4">
        <div className="text-rosey font-heading text-lg">Filter Tags</div>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 text-sm font-semibold rounded-full border transition-all duration-200 ${
                activeTags.includes(tag)
                  ? 'bg-rosey text-dark'
                  : 'bg-[#512A43] border-rosey text-white/85 hover:bg-rosey hover:text-dark'
              }`}>
              {tag}
            </button>
          ))}
        </div>
        {activeTags.length > 0 && (
          <button
            onClick={clearTags}
            className="mt-2 px-4 py-2 text-sm font-semibold text-dark bg-rosey rounded-full hover:bg-rosey transition">
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
              src={`${osrsRoseyrs.basePath}/${file}`}
              alt={file}
              className="object-contain mx-auto rounded-md max-w-full h-auto"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
