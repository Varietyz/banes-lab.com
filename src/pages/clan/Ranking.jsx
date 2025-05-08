import { differenceInMonths, parseISO } from 'date-fns';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { fetchClanMembers } from '../../api/central';
import { specialRanks, staffRanks, tenureRanks } from '../../config/ranks';
import { formatRankTitle, getRankImagePath } from '../../utils/rankUtils';

// Fade-in animation variant for all elements
const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

// Component for a uniform rank row
const RankRow = ({ rank }) => (
  <m.div variants={fadeInVariant} className="flex items-center space-x-4 py-2 border-b border-gold">
    <img
      src={getRankImagePath(rank.key)}
      alt={formatRankTitle(rank.key)}
      className="w-auto h-5 flex-shrink-0"
      onError={e => {
        e.currentTarget.src = '/assets/ranks/default.webp';
      }}
    />
    <div className="flex flex-col">
      <h3 className="text-md font-body text-gold">{rank.title}</h3>
      <p className="text-sm text-white/70">{rank.subtitle}</p>
    </div>
  </m.div>
);

/**
 *
 */
export default function ClanRanks() {
  const [members, setMembers] = useState([]);
  const [selectedRank, setSelectedRank] = useState(null);

  useEffect(() => {
    fetchClanMembers().then(setMembers);
  }, []);

  const getHighestEligibleByRank = () => {
    const assigned = new Set();
    const rankMap = {};

    // Sort from highest to lowest tenure
    const sortedRanks = [...tenureRanks].sort((a, b) => {
      const aMonths = parseInt(a.subtitle.match(/\d+/)?.[0] ?? '0', 10);
      const bMonths = parseInt(b.subtitle.match(/\d+/)?.[0] ?? '0', 10);
      return bMonths - aMonths;
    });

    for (const rank of sortedRanks) {
      if (rank.key === 'guest') continue;

      const monthsRequired = parseInt(rank.subtitle.match(/\d+/)?.[0] ?? '0', 10);
      const eligible = members.filter(member => {
        if (assigned.has(member.player_id)) return false;

        const joined = parseISO(member.joined_at);
        const months = differenceInMonths(new Date(), joined);

        const isEligible =
          months >= monthsRequired &&
          member.rank !== 'guest' &&
          !staffRanks.some(s => s.key === member.rank) &&
          !specialRanks.some(s => s.key === member.rank);

        if (isEligible) assigned.add(member.player_id);
        return isEligible;
      });

      rankMap[rank.key] = eligible;
    }

    return rankMap;
  };

  const eligibleMap = getHighestEligibleByRank();

  return (
    <LazyMotion features={domAnimation}>
      <div className="px-4 scroll-smooth">
        <div className="max-w-4xl mx-auto flex-1 px-12 pb-5 md:pb-12 pt-5 md:pt-10 bg-dark rounded-3xl border border-gold">
          {/* Detailed Clan Header */}
          <m.header
            initial="hidden"
            animate="visible"
            variants={fadeInVariant}
            className="flex flex-col items-center text-center mb-16">
            <img
              src="/assets/images/varietyz/varietyz_logo.gif"
              alt="Varietyz Logo"
              className="w-auto h-40 mb-4"
            />
            <h1 className="text-4xl md:text-5xl font-heading text-gold mb-4">Clan Ranks</h1>
            <p className="max-w-2xl text-base md:text-lg text-white/70">
              In Old School RuneScape, our clan ranks are more than just titles—they reflect honor,
              commitment, and the unique roles that each member plays in upholding the legacy of
              Varietyz. They are a mark of achievement and responsibility across all levels of the
              clan.
            </p>
          </m.header>

          {/* Staff Ranks Section */}
          <m.section
            initial="hidden"
            animate="visible"
            variants={fadeInVariant}
            className="flex flex-col mb-16">
            <div className="mb-4 flex flex-col items-center text-center">
              <h2 className="text-3xl font-heading text-gold mb-2">Staff Ranks</h2>
              <p className="text-sm md:text-base text-white/70 max-w-xl">
                Leadership and trusted management positions guiding the clan.
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              {staffRanks.map(rank => (
                <RankRow key={rank.key} rank={rank} />
              ))}
            </div>
          </m.section>

          {/* Special Ranks Section */}
          <m.section
            initial="hidden"
            animate="visible"
            variants={fadeInVariant}
            className="flex flex-col mb-16">
            <div className="mb-4 flex flex-col items-center text-center">
              <h2 className="text-3xl font-heading text-gold mb-2">Special Ranks</h2>
              <p className="text-sm md:text-base text-white/70 max-w-xl">
                Unique roles recognizing exceptional expertise and contributions.
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              {specialRanks.map(rank => (
                <RankRow key={rank.key} rank={rank} />
              ))}
            </div>
          </m.section>

          {/* Time-based Ranks Section */}
          <m.section
            initial="hidden"
            animate="visible"
            variants={fadeInVariant}
            className="flex flex-col mb-16">
            <div className="mb-4 flex flex-col items-center text-center">
              <h2 className="text-3xl font-heading text-gold mb-2">Time-based Ranks</h2>
              <p className="text-sm md:text-base text-white/70 max-w-xl">
                Celebrating service and dedication through milestones within Varietyz.
              </p>
            </div>
            <div className="flex flex-col space-y-2 relative">
              {tenureRanks.map(rank => {
                const eligible = eligibleMap[rank.key] || [];

                return (
                  <div key={rank.key} className="relative">
                    <RankRow rank={rank} />
                    {rank.key !== 'guest' &&
                      eligible.length > 0 &&
                      (() => {
                        const incorrect = eligible.filter(member => member.rank !== rank.key);
                        const incorrectCount = incorrect.length;
                        const allCorrect = incorrectCount === 0;

                        return (
                          <button
                            onClick={() => setSelectedRank({ ...rank, eligible })}
                            className={`absolute top-1 right-1 text-xs px-2 py-1 rounded-full shadow transition flex items-center gap-1
                              ${
                                allCorrect
                                  ? 'bg-green-600/20 text-green-200 border border-green-600'
                                  : 'bg-red-500/20 text-red-200 border border-red-500'
                              }
                            `}>
                            {allCorrect
                              ? eligible.length === 1
                                ? '1 member'
                                : `${eligible.length} members`
                              : incorrectCount === 1
                                ? '1 member'
                                : `${incorrectCount} members`}
                            {allCorrect ? '✅' : '⚠️'}
                          </button>
                        );
                      })()}
                  </div>
                );
              })}
            </div>
          </m.section>
          {/* Eligibility modal */}
          {selectedRank && (
            <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-6">
              <div className="bg-dark border border-gold rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto no-scrollbar p-6 relative">
                <button
                  onClick={() => setSelectedRank(null)}
                  className="absolute top-4 right-4 text-white text-lg">
                  ✖
                </button>
                <h2 className="text-2xl font-heading text-gold mb-4">
                  {selectedRank.title} Eligible Members
                </h2>
                <div className="space-y-4">
                  {selectedRank.eligible.map(member => (
                    <div
                      key={member.player_id}
                      className={`flex items-center space-x-4 border-b border-gold py-2 px-2 rounded transition ${member.rank !== selectedRank.key ? 'bg-red-500/10' : ''}`}>
                      <img
                        src={getRankImagePath(member.rank)}
                        alt={formatRankTitle(member.rank)}
                        className="w-auto h-5"
                        onError={e => {
                          e.currentTarget.src = '/assets/ranks/default.webp';
                        }}
                      />
                      <span className="text-white font-body">{member.rsn}</span>
                      <span className="text-sm text-white/50">
                        ({formatRankTitle(member.rank)})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Call-to-Action Section */}
          <m.section
            initial="hidden"
            animate="visible"
            variants={fadeInVariant}
            className="flex flex-col items-center text-center  ">
            <h2 className="text-3xl font-heading text-gold mb-4">Become a Part of Varietyz</h2>
            <p className="text-base text-white/70 mb-6 max-w-xl">
              Join our distinguished community in Old School RuneScape. Embrace the honor, rise
              through the ranks, and leave your mark on the legacy of Varietyz.
            </p>
            <a
              href="/varietyz-clan/how-to-join"
              className="flex items-center justify-center bg-gold text-dark font-body px-6 py-3 rounded-md shadow transition duration-300">
              Apply Now
            </a>
          </m.section>
        </div>
      </div>
    </LazyMotion>
  );
}
