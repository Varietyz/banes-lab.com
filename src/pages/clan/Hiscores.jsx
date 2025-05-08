// 📂 src/pages/Hiscores.jsx
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition
} from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import Header from '../../components/layout/Header';
import Navbar from '../../components/layout/Navbar';
import { getEmojiPath, getMetricType, metricGroups } from '../../config/metrics';

import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

/**
 * Returns the header image path based on the metric type.
 * - Skill and Boss use assets/skills_bosses.
 * - Activity uses assets/hiscores_activities.
 * - Computed uses assets/special.
 *
 * @param {string} metric - the metric identifier.
 * @returns {string} the corresponding image path.
 */
const getHeaderImagePath = metric => {
  const type = getMetricType(metric);
  switch (type) {
    case 'skill':
    case 'boss':
      return `/assets/skills_bosses/${metric}.webp`;
    case 'activity':
      return `/assets/hiscores_activities/${metric}.webp`;
    case 'computed':
      return `/assets/special/${metric}.webp`;
    default:
      return `/assets/skills_bosses/${metric}.webp`;
  }
};

/**
 *
 */
export default function Hiscores() {
  const [metric, setMetric] = useState('overall');
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState('rank'); // 'rank', 'experience', 'level', etc.
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'

  const scrollRef = useRef(null);

  // Cached image hook for header images.
  const useCachedImage = src => {
    const [imageSrc, setImageSrc] = useState(src);

    useEffect(() => {
      const cachedImage = localStorage.getItem(src);
      if (cachedImage) {
        setImageSrc(cachedImage); // Use cached image if available
      } else {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          localStorage.setItem(src, img.src); // Cache the image after loading
          setImageSrc(img.src); // Update state with the newly loaded image
        };
      }
    }, [src]);

    return imageSrc;
  };

  // Determine header image path based on metric type.
  const headerImagePath = getHeaderImagePath(metric);
  const cachedImageSrc = useCachedImage(headerImagePath);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.wiseoldman.net/v2/groups/9445/hiscores?metric=${metric}&limit=1000`)
      .then(res => (res.ok ? res.json() : Promise.reject(res)))
      .then(data => {
        setEntries(Array.isArray(data) ? data : []);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));

    // ✅ Adjust sort key based on metric type.
    const type = getMetricType(metric);
    switch (type) {
      case 'skill':
        setSortKey('experience');
        break;
      case 'boss':
        setSortKey('kills');
        break;
      case 'activity':
        setSortKey('score');
        break;
      case 'computed':
        setSortKey('value');
        break;
      default:
        setSortKey('experience');
    }
  }, [metric]);

  // ✅ SORT LOGIC BASED ON METRIC TYPE
  const sortedEntries = [...entries]
    .filter(entry => {
      const value = (() => {
        switch (sortKey) {
          case 'rank':
            return entry.data.rank;
          case 'level':
            return entry.data.level;
          case 'experience':
            return entry.data.experience;
          case 'kills':
            return entry.data.kills;
          case 'score':
            return entry.data.score;
          case 'value':
            return entry.data.value;
          default:
            return 0;
        }
      })();
      return (
        value !== -1 &&
        value !== null &&
        value !== undefined &&
        !(sortKey === 'experience' && value === 0)
      );
    })
    .sort((a, b) => {
      const getValue = entry => {
        switch (sortKey) {
          case 'rank':
            return entry.data.rank ?? Infinity;
          case 'level':
            return entry.data.level ?? 0;
          case 'experience':
            return entry.data.experience ?? 0;
          case 'kills':
            return entry.data.kills ?? 0;
          case 'score':
            return entry.data.score ?? 0;
          case 'value':
            return entry.data.value ?? 0;
          default:
            return 0;
        }
      };

      const valA = getValue(a);
      const valB = getValue(b);

      // Invert rank logic: a lower rank number is better.
      const actualSortOrder =
        sortKey === 'rank' ? (sortOrder === 'asc' ? 'desc' : 'asc') : sortOrder;

      return actualSortOrder === 'asc' ? valA - valB : valB - valA;
    });

  // Determine if a header image should be rendered for the current metric.
  const metricType = getMetricType(metric);
  const showHeaderImage = ['skill', 'boss', 'activity', 'computed'].includes(metricType);

  return (
    <div ref={scrollRef} className="scroll-smooth px-4 text-white">
      <Header colorScheme="gold" />
      <Navbar colorScheme="gold" />

      <section className="max-w-6xl mx-auto space-y-5">
        {showHeaderImage && (
          <div className="flex flex-col items-center text-center">
            {/* Preload the header image from its dynamic folder */}
            <link rel="preload" href={headerImagePath} as="image" />

            <img
              src={cachedImageSrc}
              alt={`${metric} visual`}
              className="w-auto h-28 object-contain pointer-events-none select-none"
              onError={e => (e.currentTarget.style.display = 'none')}
              loading="lazy"
            />
            <h2 className="text-gold text-2xl font-heading capitalize tracking-wide">
              {metric.replace(/_/g, ' ')}
            </h2>
          </div>
        )}

        {/* 🔰 Metric Selector & Sorting Controls */}
        <div className="flex flex-col md:flex-row justify-center items-end gap-6 md:gap-10 w-full max-w-4xl mx-auto mb-4">
          {/* 🎯 Metric Dropdown */}
          <div className="w-full max-w-xs">
            <Listbox value={metric} onChange={setMetric}>
              <div className="relative">
                <ListboxButton className="relative w-full h-[42px] cursor-pointer rounded border border-gold bg-dark px-3 text-left text-white text-sm shadow-sm focus:outline-none flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <img src={getEmojiPath(metric)} alt="" className="w-5 h-5" />
                    <span className="capitalize">{metric.replace(/_/g, ' ')}</span>
                  </span>
                  <ChevronUpDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
                </ListboxButton>

                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <ListboxOptions className="absolute mt-1 max-h-72 w-full overflow-auto rounded bg-dark border border-gold py-1 text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 no-scrollbar">
                    {metricGroups.map(({ group, options }) => (
                      <div key={group}>
                        <div className="bg-gold/80 text-darkest px-4 py-2 text-sm font-bold uppercase tracking-wider text-center">
                          {group}
                        </div>
                        {options.map((opt, index) => (
                          <ListboxOption
                            key={opt.value}
                            value={opt.value}
                            className={({ active }) =>
                              `relative cursor-pointer select-none py-3 px-4 text-center transition-all duration-150 transform ${
                                index % 2 === 0 ? 'bg-[#181818]' : 'bg-[#101010]'
                              } ${active ? 'bg-gold/20 text-gold rounded' : 'text-white'} hover:scale-105`
                            }>
                            {({ selected }) => (
                              <div className="flex items-center justify-center gap-2">
                                <img
                                  src={getEmojiPath(opt.value)}
                                  alt=""
                                  className="w-5 h-5"
                                  onError={e => (e.currentTarget.style.display = 'none')}
                                />
                                <span
                                  className={`truncate text-sm ${
                                    selected ? 'text-gold font-bold' : 'text-white'
                                  }`}>
                                  {opt.label}
                                </span>
                              </div>
                            )}
                          </ListboxOption>
                        ))}
                      </div>
                    ))}
                  </ListboxOptions>
                </Transition>
              </div>
            </Listbox>
          </div>

          {/* 🧮 Sorting Controls */}
          <div className="flex flex-row flex-wrap gap-4 items-end text-white text-sm">
            {/* Sort Key */}
            <div className="flex flex-col items-start">
              <label htmlFor="sortKey" className="mb-1 text-center text-white/70">
                Sort by
              </label>
              <select
                id="sortKey"
                value={sortKey}
                onChange={e => setSortKey(e.target.value)}
                className="bg-dark border border-gold text-white rounded px-3 py-2 text-sm h-[42px] focus:outline-none">
                {metric === 'overall' ? (
                  <>
                    <option value="experience">Experience</option>
                    <option value="level">Level</option>
                  </>
                ) : getMetricType(metric) === 'skill' ? (
                  <>
                    <option value="experience">Experience</option>
                  </>
                ) : null}

                {getMetricType(metric) === 'boss' && <option value="kills">Kills</option>}
                {getMetricType(metric) === 'activity' && <option value="score">Score</option>}
                {getMetricType(metric) === 'computed' && <option value="value">Value</option>}

                <option value="rank">Global Rank</option>
              </select>
            </div>

            {/* Sort Order */}
            <div className="flex flex-col items-start">
              <label htmlFor="sortOrder" className="mb-1 text-center text-white/70">
                Order
              </label>
              <select
                id="sortOrder"
                value={sortOrder}
                onChange={e => setSortOrder(e.target.value)}
                className="bg-dark border border-gold text-white rounded px-3 py-2 text-sm h-[42px] focus:outline-none">
                <option value="desc">Highest → Lowest</option>
                <option value="asc">Lowest → Highest</option>
              </select>
            </div>
          </div>
        </div>

        {/* 🔄 Loading & Error States */}
        {loading && (
          <p className="text-center text-gold font-medium">Loading {metric} hiscores...</p>
        )}
        {error && (
          <p className="text-center text-red-500">Failed to fetch hiscores. Try again later.</p>
        )}

        {/* 📊 Leaderboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedEntries.map((entry, index) => {
            const type = getMetricType(metric);
            return (
              <div
                key={entry.player.id}
                className="relative group bg-dark border border-gold rounded-lg p-4 transition transform hover:scale-[1.02] shadow-sm cursor-pointer overflow-hidden"
                onClick={() =>
                  window.open(`https://wiseoldman.net/players/${entry.player.username}`, '_blank')
                }>
                {/* 🧠 Overlay Hover Blur + Text */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition duration-200 z-20 flex flex-col items-center justify-center text-center px-2">
                  <img
                    src="/assets/emojis/wise_old_man.webp"
                    alt="Wise Old Man"
                    className="w-8 h-8 mb-2 drop-shadow"
                  />
                  <p className="text-white text-xs font-semibold">
                    View on<span className="text-gold font-bold"> Wise Old Man</span>
                  </p>
                </div>

                {/* 🎯 Leaderboard Card Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-white text-base font-semibold truncate max-w-[75%] flex items-center gap-1">
                      {entry.player.displayName}
                      {index === 0 && '🥇'}
                      {index === 1 && '🥈'}
                      {index === 2 && '🥉'}
                    </h2>
                    <span className="text-xs bg-gold text-dark font-bold px-2 py-[2px] rounded shadow-sm shrink-0">
                      {entry.data.rank === -1 ? 'Unranked' : `🌍${entry.data.rank}`}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-white/70">
                    {type === 'skill' && (
                      <>
                        <div className="flex justify-between">
                          <span>Level:</span>
                          <span className="font-bold text-white">{entry.data.level || '—'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>XP:</span>
                          <span className="font-bold text-white">
                            {entry.data.experience?.toLocaleString() || 'N/A'}
                          </span>
                        </div>
                      </>
                    )}

                    {type === 'boss' && (
                      <div className="flex justify-between">
                        <span>Kills:</span>
                        <span className="font-bold text-white">
                          {entry.data.kills?.toLocaleString() || '—'}
                        </span>
                      </div>
                    )}

                    {type === 'activity' && (
                      <div className="flex justify-between">
                        <span>Score:</span>
                        <span className="font-bold text-white">
                          {entry.data.score?.toLocaleString() || '—'}
                        </span>
                      </div>
                    )}

                    {type === 'computed' && (
                      <div className="flex justify-between">
                        <span>Value:</span>
                        <span className="font-bold text-white">
                          {entry.data.value?.toLocaleString() || '—'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
