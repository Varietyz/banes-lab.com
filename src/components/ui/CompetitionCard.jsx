import React, { useState, useEffect } from 'react';
/**
 * Custom hook to compute a live countdown string to a target date.
 * @param {string|Date} targetDate - The end date/time for the countdown.
 * @returns {string} - A formatted time string.
 */
export const useCountdown = targetDate => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) {
        setTimeLeft('Competition ended');
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
};

/**
 * CompetitionHeader displays an optional icon and the competition metric.
 * @param root0
 * @param root0.icon
 * @param root0.metric
 */
const CompetitionHeader = ({ icon, metric }) => (
  <div className="col-span-full flex items-center gap-3 border-b border-gold/30 pb-3">
    {icon && <img src={icon} alt={metric} className="w-8 h-8" />}
    <h2
      className="text-2xl font-bold capitalize tracking-wide"
      style={{ color: 'var(--dominant-color)' }}>
      {metric.replace(/_/g, ' ')}
    </h2>
  </div>
);

/**
 * CountdownCard displays the countdown timer.
 * @param root0
 * @param root0.countdown
 */
const CountdownCard = ({ countdown }) => (
  <div className="bg-gold/10 rounded-md p-3 flex flex-col justify-center items-center">
    <p className="text-lg font-semibold text-green-400">⏳ {countdown}</p>
    <p className="text-xs text-white/70">Countdown</p>
  </div>
);

/**
 * DateCard displays formatted date information.
 * @param root0
 * @param root0.label
 * @param root0.date
 * @param root0.icon
 */
const DateCard = ({ label, date, icon = null }) => (
  <div className="bg-gold/10 rounded-md p-3 flex flex-col justify-center items-center">
    <p className="text-sm font-semibold">
      {icon} {date.toLocaleString()}
    </p>
    <p className="text-xs text-white/70">{label}</p>
  </div>
);

/**
 * LeaderboardEntry renders a single leaderboard row using a grid layout
 * with fixed columns for the medal, name (with links), and score.
 *
 * @param {Object} props
 * @param {Object} props.participant - Participant information.
 * @param {number} props.index - Global leaderboard index (used for ranking).
 * @param {string} props.metric - The competition's metric (e.g. "zulrah").
 * @param {string|Date} props.startDate - Competition start date.
 * @param {string|Date} props.endDate - Competition end date.
 */
const LeaderboardEntry = ({ participant, index, metric, startDate, endDate }) => {
  // Define the medal for the top three positions.
  const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;

  // Build the competition URL dynamically.
  const competitionUrl = `https://wiseoldman.net/players/${encodeURIComponent(
    participant.rsn
  )}/gained?metric=${encodeURIComponent(metric)}&startDate=${encodeURIComponent(
    new Date(startDate).toISOString()
  )}&endDate=${encodeURIComponent(new Date(endDate).toISOString())}`;

  return (
    <li className="grid grid-cols-[2rem_1fr_auto] items-center gap-2 py-1 px-2 rounded hover:bg-white/5 transition">
      {/* Medal Column */}
      <span className="font-bold text-center">{medal}</span>

      {/* Player Name & Links Column */}
      <div className="flex flex-col">
        {/* Primary link to the player's profile using RSN */}
        <a
          href={competitionUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-beige font-body hover:text-gold transition truncate">
          {participant.rsn}
        </a>
      </div>

      {/* XP/KC Score Column */}
      <span className="text-sm font-semibold tabular-nums whitespace-nowrap text-right">
        {participant.gained.toLocaleString()} XP/KC
      </span>
    </li>
  );
};

/**
 * Helper function to chunk an array into subarrays of a given size.
 * @param {Array} array - The array to chunk.
 * @param {number} size - The chunk size.
 * @returns {Array[]} - An array of chunks.
 */
function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

/**
 * Leaderboard organizes participants into a grid with three columns.
 * Each column holds up to 5 entries.
 *
 * For example:
 *  - Entries 1-5 in the left column,
 *  - 6-10 in the center column,
 *  - 11-15 in the right column,
 *  - Then a new row starts for entries 16-30, etc.
 *
 * @param {Object} props
 * @param {Array} props.leaderboard - Array of participant objects.
 * @param {string} props.metric - Competition metric.
 * @param {string|Date} props.startDate - Competition start date.
 * @param {string|Date} props.endDate - Competition end date.
 * @param {string} props.metricImageSrc - URL for the faded background image.
 */
export const Leaderboard = ({ leaderboard, metric, startDate, endDate, metricImageSrc }) => {
  // Split the entire list into columns of 5.
  const columns = chunkArray(leaderboard, 5);

  // Then group these columns into rows of 3 columns each.
  const rows = chunkArray(columns, 3);

  return (
    <div className="bg-gold/10 rounded-md p-4 relative overflow-hidden">
      {/* Faded background image */}
      <img
        src={metricImageSrc}
        alt={metric}
        crossOrigin="anonymous"
        className="absolute inset-0 m-auto h-40 w-auto opacity-10 blur-sm pointer-events-none"
        onError={e => (e.target.style.display = 'none')}
      />
      <h4 className="text-lg font-semibold mb-3 text-center relative">Leaderboard</h4>
      {leaderboard.length === 0 ? (
        <p className="italic text-center text-white/50">No participants yet.</p>
      ) : (
        rows.map((rowCols, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-3 gap-4 mb-6 relative">
            {rowCols.map((colParticipants, colIndex) => (
              <ul key={colIndex} className="space-y-2 w-full">
                {colParticipants.map((participant, pIndex) => {
                  // Calculate global index (for medal ranking) based on row and column.
                  const globalIndex = rowIndex * 15 + colIndex * 5 + pIndex;
                  return (
                    <LeaderboardEntry
                      key={participant.playerId}
                      participant={participant}
                      index={globalIndex}
                      metric={metric}
                      startDate={startDate}
                      endDate={endDate}
                    />
                  );
                })}
              </ul>
            ))}
            {/* Fill missing columns in this row with empty elements to maintain symmetry */}
            {rowCols.length < 3 &&
              Array.from({ length: 3 - rowCols.length }).map((_, idx) => (
                <div key={`empty-${idx}`} className="w-full" />
              ))}
          </div>
        ))
      )}
    </div>
  );
};

/**
 * CompetitionCard is the main component that composes all subcomponents together.
 * @param {Object} props
 * @param {Object} props.comp - Competition information.
 * @param {string} props.icon - Optional icon for the competition.
 */
const CompetitionCard = ({ comp, icon }) => {
  const countdown = useCountdown(comp.ends_at);
  const metricImageSrc = `/assets/skills_bosses/${comp.metric.toLowerCase()}.webp`;

  return (
    <div className="text-gold bg-dark rounded-xl p-4 shadow-xl border border-gold/50 grid grid-cols-1 gap-4 relative overflow-hidden">
      <CompetitionHeader icon={icon} metric={comp.metric} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CountdownCard countdown={countdown} />
        <DateCard label="Start Date" date={new Date(comp.starts_at)} />
        <DateCard label="End Date" date={new Date(comp.ends_at)} />
      </div>
      <Leaderboard
        leaderboard={comp.leaderboard}
        metric={comp.metric}
        startDate={comp.starts_at}
        endDate={comp.ends_at}
        metricImageSrc={metricImageSrc}
      />
    </div>
  );
};

export default CompetitionCard;
