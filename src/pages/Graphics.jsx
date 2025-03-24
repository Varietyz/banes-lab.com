// 📂 src/pages/Graphic_Design.jsx
import { useState, useEffect } from 'react';
import Modal from '../components/ui/Modal';
import useInView from '../hooks/useInView';
import useScrollDirection from '../hooks/useScrollDirection';
import {
  droptrackerFiles,
  enigmaRoot,
  logos,
  osrsAvatars,
  osrsBingo,
  runeliteTheme,
  varietyzDeluxe,
  osrsRoseyrs,
  runeliteUI,
  osrsVarietyz,
  elements,
} from '../data/graphicsData';

/* ------------------------------------------------------------
  1) HELPER FUNCTIONS (Droptracker & Generic)
------------------------------------------------------------*/
function createDroptrackerEntry({ basePath, fileName }) {
  // Example: Full_Pink_Halfrounded_Board => "Full Pink Halfrounded"
  const nameWithoutExt = fileName.replace(/\.(png|jpg|gif|jpeg)$/i, '');
  const isFull = nameWithoutExt.startsWith('Full_');
  let processedName = nameWithoutExt.replace(/^Full_/, '').replace('_Board', '');
  const parts = processedName.split('_');
  const color = parts[0];
  const style = parts.slice(1).join(' ');

  return {
    title: `Droptracker UI – ${isFull ? 'Full ' : ''}${color} ${style}`,
    description: `A ${color.toLowerCase()} themed ${style.toLowerCase()} board design for Droptracker UI.`,
    image: `${basePath}/${fileName}`,
    tags: ['Droptracker', 'UI Design', color, style],
  };
}

function createGenericEntry({ basePath, fileName, prefix = '', extraTags = [] }) {
  // Example: enigma_banner.gif => "enigma banner"
  const name = fileName.replace(/\.(png|jpg|gif|jpeg)$/i, '');
  const titlePart = name.split(/[_\/]/).join(' ');
  const title = prefix ? `${prefix} – ${titlePart}` : titlePart;
  const description = prefix
    ? `${prefix} asset: ${titlePart}.`
    : `Asset: ${titlePart}.`;
  const tags = [...titlePart.split(' '), ...extraTags];

  return {
    title,
    description,
    image: `${basePath}/${fileName}`,
    tags,
  };
}


/* ------------------------------------------------------------
  3) GENERATE ARRAYS FOR EACH FOLDER
------------------------------------------------------------*/

// C: Droptracker
const droptrackerData = droptrackerFiles.files.map((file) =>
  createDroptrackerEntry({
    basePath: droptrackerFiles.basePath,
    fileName: file,
  })
);

// D: Enigma Esports
const enigmaRootData = enigmaRoot.files.map((file) =>
  createGenericEntry({
    basePath: enigmaRoot.basePath,
    fileName: file,
    prefix: 'Enigma Esports',
    extraTags: ['Branding'],
  })
);

// E: Logos
const logosData = logos.files.map((file) => {
  let title;
  if (file.includes('enigma')) {
    title = 'Enigma Esports Logo';
  } else if (file.includes('varietyz')) {
    title = 'Varietyz Logo';
  } else if (file.includes('rosey')) {
    title = 'RoseyRS Logo';
  }

  return {
    title,
    description: `Logo asset: ${file.split('.')[0].split('_').join(' ')}`,
    image: `${logos.basePath}/${file}`,
    tags: ['Logo'],
  };
});

// F: OSRS Avatars
const osrsAvatarsData = osrsAvatars.files.map((file) =>
  createGenericEntry({
    basePath: osrsAvatars.basePath,
    fileName: file,
    prefix: 'OSRS Avatar',
    extraTags: ['Avatar'],
  })
);

// G: OSRS Bingo
const osrsBingoData = osrsBingo.files.map((file) =>
  createGenericEntry({
    basePath: osrsBingo.basePath,
    fileName: file,
    prefix: 'OSRS Bingo',
    extraTags: ['Bingo'],
  })
);

// H: RuneLite Theme
const runeliteThemeData = runeliteTheme.files.map((file) =>
  createGenericEntry({
    basePath: runeliteTheme.basePath,
    fileName: file,
    prefix: 'RuneLite Theme',
    extraTags: ['RuneLite', 'Theme'],
  })
);

// I: Varietyz Deluxe
const varietyzDeluxeData = varietyzDeluxe.files.map((file) =>
  createGenericEntry({
    basePath: varietyzDeluxe.basePath,
    fileName: file,
    prefix: 'Varietyz Deluxe',
    extraTags: ['Varietyz', 'Deluxe', 'Theme'],
  })
);

// J: OSRS Roseyrs
const osrsRoseyrsData = osrsRoseyrs.files.map((file) =>
  createGenericEntry({
    basePath: osrsRoseyrs.basePath,
    fileName: file,
    prefix: 'Roseyrs',
    extraTags: ['Roseyrs', 'Branding'],
  })
);

// K: RuneLite UI
const runeliteUIData = runeliteUI.files.map((file) =>
  createGenericEntry({
    basePath: runeliteUI.basePath,
    fileName: file,
    prefix: 'RuneLite UI',
    extraTags: ['RuneLite', 'UI'],
  })
);

// L: OSRS Varietyz
const osrsVarietyzData = osrsVarietyz.files.map((file) =>
  createGenericEntry({
    basePath: osrsVarietyz.basePath,
    fileName: file,
    prefix: 'Varietyz',
    extraTags: ['Varietyz'],
  })
);

// N: Elements
const elementsData = elements.files.map((file) =>
  createGenericEntry({
    basePath: elements.basePath,
    fileName: file,
    prefix: 'UI Elements',
    extraTags: ['UI'],
  })
);

/* ------------------------------------------------------------
  4) GALLERIES ARRAY
------------------------------------------------------------*/
const galleries = [
  { name: 'Varietyz Clan', data: osrsVarietyzData },
  { name: 'Enigma Esports', data: enigmaRootData },
  { name: 'Roseyrs', data: osrsRoseyrsData },
  { name: 'Logos', data: logosData },
  { name: 'Droptracker', data: droptrackerData },
  { name: 'OSRS Avatars', data: osrsAvatarsData },
  { name: 'Web Elements', data: elementsData },
  { name: 'RuneLite UI', data: runeliteUIData },
  { name: 'OSRS Bingo', data: osrsBingoData },
  { name: 'RuneLite Theme', data: runeliteThemeData },
  { name: 'Varietyz Deluxe Theme', data: varietyzDeluxeData },
];

/* ------------------------------------------------------------
  5) GALLERY COMPONENT
------------------------------------------------------------*/
function Gallery({ galleryName, items }) {
  const [selected, setSelected] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);

  // Preload images
  useEffect(() => {
    items.forEach(({ image }) => {
      const img = new Image();
      img.src = image;
    });
  }, [items]);

  // Which items to render
  const visibleItems = items.slice(0, visibleCount);

  const loadMore = () => setVisibleCount((prev) => prev + 12);

  return (
    <section className="w-full px-4 py-6">
      <h3 className="text-center text-2xl md:text-3xl font-heading text-gold mb-4">
        {galleryName}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
        {visibleItems.map((project, index) => (
          <div
            key={index}
            className="
              bg-dark 
              border border-gold 
              rounded-xl 
              overflow-hidden 
              shadow-md 
              hover:shadow-lg 
              transition-shadow 
              duration-300 
              cursor-pointer
            "
            onClick={() => setSelected(project)}
          >
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-32 object-cover"
            />
            <div className="p-4 text-white">
              <h4 className="text-lg font-heading text-gold mb-1">
                {project.title}
              </h4>
              <p className="text-xs font-body mb-2">{project.description}</p>
              <div className="flex flex-wrap gap-1 text-[10px] font-body">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 border border-gold rounded-full text-gold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < items.length && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            className="px-4 py-2 bg-gold text-dark font-bold rounded-full shadow hover:bg-accent transition"
          >
            Load More
          </button>
        </div>
      )}

      {/* Modal for selected item */}
      <Modal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

/* ------------------------------------------------------------
  6) ANIMATED GALLERY WRAPPER
------------------------------------------------------------*/
function AnimatedGallery({ galleryObj }) {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const scrollDirection = useScrollDirection();

  let animationClass;
  if (isInView) {
    animationClass = 'animate-fadeInUpLarge';
  }

  return (
    <div ref={ref} className={`transition-opacity duration-200 ${animationClass}`}>
      <Gallery galleryName={galleryObj.name} items={galleryObj.data} />
    </div>
  );
}

/* ------------------------------------------------------------
  7) PORTFOLIO COMPONENT
------------------------------------------------------------*/
export default function Graphic_Design() {
  return (
    <div className="h-[97vh] no-scrollbar overflow-y-auto pt-10 scroll-smooth">
      {galleries.map((galleryObj, idx) => (
        <AnimatedGallery key={idx} galleryObj={galleryObj} />
      ))}
    </div>
  );
}
