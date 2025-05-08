import { useEffect, useState } from 'react';
import { fetchCompetitions } from '../../api/central';
import Header from '../../components/layout/Header';
import Navbar from '../../components/layout/Navbar';
import CompetitionCard from '../../components/ui/CompetitionCard';
import { getSkillOrBossPath } from '../../config/metrics';

/**
 * @typedef {Object} Competition
 * @property {string} competition_id - Unique identifier for the competition.
 * @property {string} type - Competition category (e.g., "SOTW" or "BOTW").
 * @property {string} metric - The key used to determine the emoji icon.
 * @property {string} starts_at - ISO date string when the competition starts.
 * @property {string} ends_at - ISO date string when the competition ends.
 * @property {Array<Participant>} leaderboard - Array of participant objects.
 */

/**
 * @typedef {Object} Participant
 * @property {string} playerId - Unique identifier for the player.
 * @property {string} rsn - RuneScape username.
 * @property {number} gained - Experience or KC gained value.
 * @property {string} profileUrl - Link to the player's profile.
 */

/**
 * Preload an array of assets (images or videos).
 * This way, they're in cache when we switch sources.
 * @param {Array<string>} urls
 */
function preloadAssets(urls) {
  urls.forEach(url => {
    if (url.endsWith('.mp4')) {
      const vid = document.createElement('video');
      vid.src = url;
      vid.preload = 'auto';
    } else {
      const img = new Image();
      img.src = url;
    }
  });
}

/**
 * Loads and caches emoji image sources for given competitions.
 * Uses localStorage as a simple cache to prevent redundant network requests.
 *
 * @param {Competition[]} competitions
 * @returns {Promise<Record<string, string>>} A promise that resolves to an object mapping metric keys to cached image sources.
 */
async function loadAndCacheEmojis(competitions) {
  const iconMap = {};
  const loadImagePromises = competitions.map(({ metric }) => {
    const path = getSkillOrBossPath(metric);
    const cached = localStorage.getItem(path);
    if (cached) {
      console.log(`Found cached emoji for ${metric}: ${cached}`);
      iconMap[metric] = cached;
      return Promise.resolve();
    }
    return new Promise(resolve => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = path;
      img.onload = () => {
        console.log(`Loaded emoji for ${metric} from ${path}`);
        localStorage.setItem(path, img.src);
        iconMap[metric] = img.src;
        resolve();
      };
      img.onerror = () => {
        console.error(`Failed to load emoji for metric: ${metric}`);
        resolve();
      };
    });
  });
  await Promise.all(loadImagePromises);
  return iconMap;
}

const Weekly = () => {
  const [competitions, setCompetitions] = useState([]);
  const [activeType, setActiveType] = useState('SOTW');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [icons, setIcons] = useState({});
  // Track whether the video has loaded for the active banner
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Reset videoLoaded when activeType changes
  useEffect(() => {
    setVideoLoaded(false);
  }, [activeType]);

  useEffect(() => {
    // Preload assets for BOTW & SOTW banners
    preloadAssets([
      '/assets/botw_sotw/botw_banner.mp4',
      '/assets/botw_sotw/botw_banner_static.webp',
      '/assets/botw_sotw/sotw_banner.mp4',
      '/assets/botw_sotw/sotw_banner_static.webp'
    ]);
  }, []);

  // Fetch competition data
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchCompetitions();
        console.log('Fetched competitions:', data);
        setCompetitions(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Cache emoji images once competitions are loaded
  useEffect(() => {
    if (competitions.length === 0) return;
    (async () => {
      const emojiMap = await loadAndCacheEmojis(competitions);
      console.log('Emoji map:', emojiMap);
      setIcons(emojiMap);
    })();
  }, [competitions]);

  // Filter competitions based on active type
  const filteredCompetitions = competitions.filter(c => c.type === activeType);

  return (
    <div className="px-4 text-white">
      <Header colorScheme="gold" />
      <Navbar colorScheme="gold" />

      <section className="max-w-6xl mx-auto space-y-10">
        <h1 className="text-4xl font-heading text-gold text-center mb-6">
          Competitions of the Week
        </h1>

        {/* Clickable competition type banners */}
        <div className="flex flex-col items-center gap-6 mb-10">
          {['BOTW', 'SOTW'].map(type => {
            const isActive = activeType === type;
            return (
              <div
                key={type}
                onClick={() => setActiveType(type)}
                className={`relative group w-full max-w-3xl rounded-md border overflow-hidden cursor-pointer transition-transform duration-300 ease-out ${
                  isActive
                    ? 'border-gold scale-105 shadow-[0_0_20px_#1f6ca8]'
                    : 'border-gold/30 hover:scale-[1.015] hover:brightness-110 hover:shadow-md'
                }`}>
                {isActive ? (
                  // Active banner: always render the static image as background and overlay the video and loading spinner.
                  <div className="relative">
                    <img
                      src={`/assets/botw_sotw/${type.toLowerCase()}_banner_static.webp`}
                      alt={`${type} banner placeholder`}
                      className="w-full h-auto"
                    />
                    {/* Loading spinner overlay until the video is loaded */}
                    {!videoLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-t-4 border-t-gold border-gray-200 rounded-full animate-spin" />
                      </div>
                    )}
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      onLoadedData={() => setVideoLoaded(true)}
                      className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none transition-opacity duration-300"
                      style={{ opacity: videoLoaded ? 1 : 0 }}>
                      <source
                        src={`/assets/botw_sotw/${type.toLowerCase()}_banner.mp4`}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  // Inactive banner always shows the static image.
                  <img
                    src={`/assets/botw_sotw/${type.toLowerCase()}_banner_static.webp`}
                    alt={`${type} banner`}
                    loading="lazy"
                    className="w-full h-auto select-none pointer-events-none"
                  />
                )}

                {/* Overlay for inactive state */}
                {!isActive && (
                  <div className="absolute inset-0 bg-black/50 transition-opacity duration-200 ease-in-out opacity-100 group-hover:opacity-90" />
                )}
              </div>
            );
          })}
        </div>

        {/* Competition data listing */}
        {loading ? (
          <p className="text-center text-gold animate-pulse">Loading competitions...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error fetching competition data.</p>
        ) : filteredCompetitions.length === 0 ? (
          <p className="text-center text-white/50">No active {activeType} competitions.</p>
        ) : (
          filteredCompetitions.map(comp => (
            <div key={comp.competition_id} className="mb-8">
              <CompetitionCard comp={comp} icon={icons[comp.metric]} />
              <div className="mt-4 p-4 bg-dark rounded-lg border border-gold/50">
                <h3 className="text-lg text-center font-bold text-gold">
                  Botw/Sotw Information 📚
                </h3>
                <ul className="mt-2 space-y-1 text-center text-sm text-white/80">
                  <li>
                    🎯 <strong>Points System:</strong> Players earn points based on total XP
                    (Skills) or KC (Bosses).
                  </li>
                  <li>
                    🥇 <strong>Winner Calculation:</strong> Highest total gain by competition end.
                  </li>
                  <li>
                    🗳️ <strong>Voting Influence:</strong> Voting happens in our Discord server.
                  </li>
                  <li>
                    🎲 <strong>Randomization:</strong> If no votes, a random metric is selected.
                  </li>
                  <li>
                    🔄 <strong>Rotation:</strong> Automatically scheduled weekly.
                  </li>
                </ul>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Weekly;
