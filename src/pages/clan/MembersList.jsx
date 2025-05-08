import { useEffect, useMemo, useRef, useState } from 'react';
import { FaDiscord } from 'react-icons/fa';
import { fetchClanMembers } from '../../api/central';
import Header from '../../components/layout/Header';
import Navbar from '../../components/layout/Navbar';
import { getSkillOrBossPath } from '../../config/metrics';
import { specialRanks, staffRanks, tenureRanks } from '../../config/ranks';
import '../../styles/markdown.css';
import { formatRankTitle, getRankImagePath } from '../../utils/rankUtils';

const POINT_TYPE_MAPPING = {
  bingo: 'Bingo',
  SOTW: 'Skill of the Week',
  BOTW: 'Boss of the Week'
};

/**
 * MembersList fetches clan members from the custom API endpoint,
 * processes the data, and renders the UI including calculated summary metrics
 * and a list of member cards.
 */
export default function MembersList() {
  const [players, setPlayers] = useState([]);
  const [rankCounts, setRankCounts] = useState({});
  const [search, setSearch] = useState('');
  const [error, setError] = useState(false);
  const scrollRef = useRef(null);

  // Merge rank definitions into one ordered hierarchy (top → bottom)
  const rankHierarchy = [
    ...staffRanks.map(r => r.key),
    ...specialRanks.map(r => r.key),
    ...tenureRanks.map(r => r.key)
  ];

  useEffect(() => {
    /**
     *
     */
    async function loadMembers() {
      try {
        const members = await fetchClanMembers();
        // Adapt the response: compute overall XP per member from their stats,
        // falling back to the computed xp if "overall" stat is not found.
        const adaptedMembers = members.map(member => {
          const computedXP =
            member.points?.reduce((sum, point) => sum + (point.points || 0), 0) || 0;
          // Attempt to find the overall xp from stats.
          const overallStat =
            member.stats && member.stats.find(s => s.type === 'skills' && s.metric === 'overall');
          const overallXP = overallStat ? Number(overallStat.exp) : computedXP;
          return {
            ...member,
            name: member.rsn, // use "rsn" as member name.
            xp: overallXP
          };
        });

        // Sort members using the rank hierarchy.
        adaptedMembers.sort((a, b) => {
          const aIndex = rankHierarchy.indexOf(a.rank);
          const bIndex = rankHierarchy.indexOf(b.rank);
          if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;
          return a.name.localeCompare(b.name);
        });

        // Build rank counters.
        const rankMap = adaptedMembers.reduce((acc, m) => {
          acc[m.rank] = (acc[m.rank] || 0) + 1;
          return acc;
        }, {});

        // Compute common progression date using stats.last_changed.
        const progressionDateCounts = {};
        adaptedMembers.forEach(m => {
          if (m.stats && Array.isArray(m.stats)) {
            m.stats.forEach(stat => {
              if (stat.last_changed) {
                const dateOnly = stat.last_changed.split('T')[0];
                progressionDateCounts[dateOnly] = (progressionDateCounts[dateOnly] || 0) + 1;
              }
            });
          }
        });
        let maxProgCount = 0;
        Object.entries(progressionDateCounts).forEach(([count]) => {
          if (count > maxProgCount) {
            maxProgCount = count;
          }
        });

        setPlayers(adaptedMembers);
        setRankCounts(rankMap);
        // Optionally, you could store total XP separately if needed.
      } catch (err) {
        console.error('Error fetching clan members:', err);
        setError(true);
      }
    }
    loadMembers();
  }, [rankHierarchy]);

  // Handle search updates.
  const handleSearch = e => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredPlayers = players.filter(
    p => p.name.toLowerCase().includes(search) || p.rank.toLowerCase().includes(search)
  );
  const singleVisiblePlayer = filteredPlayers.length === 1 ? filteredPlayers[0] : null;
  const exactMatch = players.find(p => p.name.toLowerCase() === search);
  const activeMatch = exactMatch || singleVisiblePlayer || null;

  useEffect(() => {
    const onEnter = e => {
      if (e.key === 'Enter' && activeMatch) {
        window.open(
          `https://wiseoldman.net/players/${encodeURIComponent(activeMatch.name)}`,
          '_blank'
        );
      }
    };
    document.addEventListener('keydown', onEnter);
    return () => document.removeEventListener('keydown', onEnter);
  }, [activeMatch]);

  // Compute additional summary metrics.
  const summaryStats = useMemo(() => {
    const totalMembers = players.length;
    // Combined overall XP from members.
    const combinedTotalXP = players.reduce((sum, p) => sum + p.xp, 0);
    // Combined points from the points array.
    const combinedPoints = players.reduce((sum, p) => {
      return sum + (p.points?.reduce((acc, pt) => acc + Number(pt.points || 0), 0) || 0);
    }, 0);
    // Compute most common progression date (using stats.last_changed).
    const progressionDateCounts = {};
    players.forEach(p => {
      if (p.stats && Array.isArray(p.stats)) {
        p.stats.forEach(stat => {
          if (stat.last_changed) {
            const d = stat.last_changed.split('T')[0];
            progressionDateCounts[d] = (progressionDateCounts[d] || 0) + 1;
          }
        });
      }
    });
    let mostCommonProgressionDate = 'N/A';
    let maxProgCount = 0;
    Object.entries(progressionDateCounts).forEach(([date, count]) => {
      if (count > maxProgCount) {
        mostCommonProgressionDate = date;
        maxProgCount = count;
      }
    });
    // Most common skill trained this week, excluding "overall".
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const skillCounts = {};
    players.forEach(player => {
      if (player.stats && Array.isArray(player.stats)) {
        player.stats.forEach(stat => {
          if (
            stat.type === 'skills' &&
            stat.metric !== 'overall' && // exclude overall
            new Date(stat.last_updated).getTime() >= oneWeekAgo
          ) {
            skillCounts[stat.metric] = (skillCounts[stat.metric] || 0) + 1;
          }
        });
      }
    });
    let mostCommonSkillThisWeek = '';
    let maxSkillCount = 0;
    Object.entries(skillCounts).forEach(([skill, count]) => {
      if (count > maxSkillCount) {
        mostCommonSkillThisWeek = skill;
        maxSkillCount = count;
      }
    });

    return {
      totalMembers,
      combinedTotalXP,
      combinedPoints,
      // Replace common join date with common progression date.
      mostCommonProgressionDate,
      mostCommonSkillThisWeek
    };
  }, [players]);

  return (
    <div ref={scrollRef} className="scroll-smooth px-4 ">
      <Header colorScheme="gold" />
      <Navbar colorScheme="gold" />

      <section className="max-w-6xl mx-auto space-y-12">
        {/* Logo + Title Block */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-4">
            <div
              className="w-20 select-none pointer-events-none"
              onContextMenu={e => e.preventDefault()}
              onDragStart={e => e.preventDefault()}>
              <img
                src="/assets/images/varietyz/varietyz_logo.gif"
                alt="Varietyz Logo"
                draggable={false}
                className="w-full h-auto pointer-events-none select-none"
              />
            </div>
            <div>
              <h1 className="text-4xl font-heading text-gold tracking-wide">Varietyz</h1>
              <p className="text-sm text-white/70 font-body text-shadow mt-1">
                Members List & Progress Overview
              </p>
            </div>
          </div>
          <div className="w-full max-w-xs border-t border-gold mt-2" />
        </div>

        {/* Top Controls */}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => window.open('https://discord.gg/x9W255McJq', '_blank')}
            className="px-4 py-2 bg-dark border border-gold text-gold font-medium rounded hover:bg-gold hover:text-dark transition">
            Join us on Discord
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-dark border border-gold text-gold font-medium rounded hover:bg-gold hover:text-dark transition">
            Refresh
          </button>
          <button
            onClick={() => (window.location.href = 'https://banes-lab.com')}
            className="px-4 py-2 bg-dark border border-gold text-gold font-medium rounded hover:bg-gold hover:text-dark transition">
            Back to Homepage
          </button>
        </div>

        {/* Search */}
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="🔍Search by name or rank..."
            value={search}
            onChange={handleSearch}
            className="px-4 py-2 w-full text-center max-w-xl rounded bg-dark text-white border border-gold focus:outline-none placeholder:text-white/50 placeholder:hover:opacity-10"
          />
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-3 text-white text-center">
          <div className="bg-dark border border-gold rounded-md px-3 py-3 shadow-sm">
            <p className="text-[11px] text-white/60 uppercase tracking-wide">Total Members</p>
            <p className="text-base font-semibold text-gold leading-snug mt-1">
              {summaryStats.totalMembers.toLocaleString()}
            </p>
          </div>
          <div className="bg-dark border border-gold rounded-md px-3 py-3 shadow-sm">
            <p className="text-[11px] text-white/60 uppercase tracking-wide">Combined Total XP</p>
            <p className="text-base font-semibold text-gold leading-snug mt-1">
              {summaryStats.combinedTotalXP.toLocaleString()}
            </p>
          </div>
          <div className="bg-dark border border-gold rounded-md px-3 py-3 shadow-sm">
            <p className="text-[11px] text-white/60 uppercase tracking-wide">Combined Points</p>
            <p className="text-base font-semibold text-gold leading-snug mt-1">
              {summaryStats.combinedPoints.toLocaleString()}
            </p>
          </div>
          <div className="bg-dark border border-gold rounded-md px-3 py-3 shadow-sm">
            <p className="text-[11px] text-white/60 uppercase tracking-wide">
              Common Progression Date
            </p>
            <p className="text-base font-semibold text-gold leading-snug mt-1">
              {summaryStats.mostCommonProgressionDate || 'N/A'}
            </p>
          </div>
          <div className="bg-dark border border-gold rounded-md px-3 py-3 shadow-sm">
            <p className="text-[11px] text-white/60 uppercase tracking-wide text-center">
              Most Common Trained Skill
            </p>
            <p className="text-base font-semibold text-gold leading-snug mt-1 text-center">
              <img
                src={getSkillOrBossPath(summaryStats.mostCommonSkillThisWeek)}
                alt=""
                className="w-auto h-5 inline-block mr-1"
              />
              {summaryStats.mostCommonSkillThisWeek.charAt(0).toUpperCase() +
                summaryStats.mostCommonSkillThisWeek.slice(1)}
            </p>
          </div>
        </div>

        {/* Player Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPlayers.map(player => {
            const isHighlighted =
              (exactMatch && exactMatch.name === player.name) ||
              (singleVisiblePlayer && singleVisiblePlayer.name === player.name);

            return (
              <div
                key={player.player_id}
                onClick={() =>
                  window.open(
                    `https://wiseoldman.net/players/${encodeURIComponent(player.name)}`,
                    '_blank'
                  )
                }
                title={`XP: ${Number(player.xp).toLocaleString()} | Joined: ${new Date(
                  player.joined_at
                ).toLocaleDateString()}${
                  player.registered_at
                    ? ` | Reg: ${new Date(player.registered_at).toLocaleDateString()}`
                    : ''
                }`}
                className={`
          relative group cursor-pointer rounded-lg p-4 border
          ${isHighlighted ? 'bg-dark border border-green-400 scale-105' : 'bg-dark'}
          border-gold hover:scale-105 hover:border-gold/60
          transition overflow-hidden flex flex-col h-full
        `}>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition duration-200 z-20 flex flex-col items-center justify-center text-center px-2">
                  <img
                    src="/assets/emojis/wise_old_man.webp"
                    alt="Wise Old Man"
                    className="w-auto h-8 mb-2 drop-shadow"
                  />
                  <p className="text-white text-xs font-semibold">
                    View on <span className="text-gold font-bold">Wise Old Man</span>
                  </p>
                </div>

                {/* Top content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <img
                        src={getRankImagePath(player.rank)}
                        alt={player.rank}
                        className="w-auto h-5"
                        onError={e => {
                          console.warn('Image not found:', e.currentTarget.src);
                        }}
                      />
                      <h2
                        className={`text-lg ${isHighlighted ? 'text-green-400' : 'text-white'} font-semibold`}>
                        {player.name}
                      </h2>
                    </div>
                    {player.discord_id && (
                      <FaDiscord
                        className={`w-auto h-6 ${isHighlighted ? 'text-green-400' : 'text-gold'} `}
                      />
                    )}
                  </div>

                  <p className="text-gray-300">
                    Rank:{' '}
                    <span className={`font-bold ${isHighlighted ? 'text-green-400' : 'text-gold'}`}>
                      {formatRankTitle(player.rank)}
                    </span>
                  </p>
                  <p className="text-sm text-gray-300">
                    {Number(player.xp) === 0 ? (
                      <span className="text-xs text-gray-400">Unregistered😞</span>
                    ) : (
                      `XP: ${Number(player.xp).toLocaleString()}`
                    )}
                  </p>

                  {/* Individual points breakdown with friendly formatting */}
                  {player.points && player.points.length > 0 && (
                    <div className="text-xs text-gray-400">
                      {player.points.map(pt => (
                        <div key={pt.type}>
                          {POINT_TYPE_MAPPING[pt.type] || pt.type}:{' '}
                          {Number(pt.points).toLocaleString()} pts
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom content pinned via mt-auto */}
                <div className="relative z-10 mt-auto text-xs text-gray-400">
                  Joined: {new Date(player.joined_at).toLocaleDateString()}
                  {player.registered_at && (
                    <> | Reg: {new Date(player.registered_at).toLocaleDateString()}</>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Rank Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {rankHierarchy.map(rank => {
            const count = rankCounts[rank];
            if (!count) return null;
            const names = players
              .filter(p => p.rank === rank)
              .map(p => p.name)
              .join(', ');
            return (
              <div
                key={rank}
                className="text-center border border-gold bg-dark p-4 rounded-lg"
                title={names}>
                <img
                  src={getRankImagePath(rank)}
                  alt={rank}
                  onError={e => (e.currentTarget.src = '/assets/ranks/default.webp')}
                  className=" w-auto h-5 mx-auto mb-2"
                />
                <p className="text-sm font-medium text-white">
                  <span className="text-accent font-bold">{count}</span>{' '}
                  {formatRankTitle(rank) + (count === 1 ? '' : "'s")}
                </p>
              </div>
            );
          })}
        </div>

        {error && (
          <p className="text-red-500 text-center">Error loading data from the clan members API.</p>
        )}
      </section>
    </div>
  );
}
