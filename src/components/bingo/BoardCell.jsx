import React, { useState } from 'react';

/**
 * Renders a single Bingo cell with progress, base points, and parameter-based emoji.
 *
 * @param {Object} props
 * @param {Object} props.cell - The bingo task cell.
 * @param {Object|Array|null} props.progress - Progress object (solo) or array (team).
 */
export default function BoardCell({ cell, progress }) {
  const [flipped, setFlipped] = useState(false);

  const isCompleted = progress?.status === 'completed';
  const awardedPoints = progress?.points_awarded || 0;
  const extraPoints = progress?.extra_points || 0;
  const progressValue = progress?.progress_value || 0;
  const completionPercentage = Math.min((progressValue / cell.target) * 100, 100);
  const lastUpdated = progress?.last_updated || null;
  const iconPath = `/assets/emojis/${cell.parameter}.webp`;
  const taskDesc = cell.description?.toLowerCase() || '';
  const isSOTW = cell.activeMetric && /gain|xp|exp/.test(taskDesc);
  const isBOTW = cell.activeMetric && /kill|slay|loot/.test(taskDesc);

  const metricIcon = isBOTW
    ? '/assets/osrs_ui/combat.webp'
    : isSOTW
      ? '/assets/osrs_ui/stats.webp'
      : null;

  const hasBonus = cell.activeMetric && (isSOTW || isBOTW);

  // Tooltip text
  const tooltipText = [
    `Task: ${cell.description}`,
    `Progress: ${progressValue.toLocaleString()} / ${cell.target.toLocaleString()}`,
    `Awarded Points: ${awardedPoints}`,
    extraPoints > 0 ? `Bonus: +${extraPoints} pts` : null,
    lastUpdated ? `Last Updated: ${new Date(lastUpdated).toLocaleString()}` : null
  ]
    .filter(Boolean)
    .join('\n');

  // Active metric glow
  let glowClass = '';
  if (cell.activeMetric) {
    const desc = cell.description.toLowerCase();
    if (desc.includes('xp')) {
      glowClass = 'ring-2 ring-blue animate-pulse-ring-sotw';
    } else if (desc.includes('kill') || desc.includes('slay')) {
      glowClass = 'ring-2 ring-rose-400 animate-pulse-ring-botw';
    } else {
      glowClass = 'ring-2 ring-white animate-pulse-ring';
    }
  }

  return (
    <div
      title={tooltipText}
      onClick={() => setFlipped(!flipped)}
      className={`relative flex flex-col justify-between p-3 rounded-md shadow transition duration-200 h-full hover:scale-105  ${isSOTW ? 'bg-orange-600/50' : isBOTW ? 'bg-rose-900' : ''}
 ${isCompleted ? 'bg-gold/50' : 'bg-gray-800'}${glowClass} cursor-pointer`}>
      {/* Front (existing content) */}
      <div className={`${flipped ? 'invisible' : 'visible'} flex flex-col h-full`}>
        {/* 📝 Description + Icon inline */}
        <div className="flex items-start gap-2 mb-2">
          <img
            src={iconPath}
            alt={cell.parameter}
            className="w-5 h-5 mt-[2px] shrink-0"
            onError={e => (e.target.style.display = 'none')}
          />
          <p className="text-sm font-semibold text-white leading-snug break-words">
            {cell.description}
          </p>
          {isSOTW && (
            <span className="ml-2 px-1 rounded text-[10px] bg-blue-500 text-white font-semibold">
              SOTW
            </span>
          )}
          {isBOTW && (
            <span className="ml-2 px-1 rounded text-[10px] bg-rose-500 text-white font-semibold">
              BOTW
            </span>
          )}
        </div>

        {/* 🎯 Progress & Points row */}
        <div className="grid grid-cols-2 items-end mt-auto">
          {/* Left: Always bottom-left */}
          <div className="text-xs font-medium text-left">
            {isCompleted ? (
              <span className="text-white">✅ Completed!</span>
            ) : (
              <span className="text-yellow-300">⏳{completionPercentage.toFixed(2)}%</span>
            )}
          </div>

          {/* Right: Points + (+50) below */}
          <div className="flex flex-col items-end text-xs text-white/60 text-right">
            <span>Points: {cell.base_points}</span>
            {hasBonus && (
              <div className="flex items-center gap-1 mt-[1px]">
                {metricIcon && (
                  <img
                    src={metricIcon}
                    alt="metric icon"
                    className="w-4 h-4"
                    onError={e => (e.target.style.display = 'none')}
                  />
                )}
                <span className="text-white/60 text-[11px]">(+50)</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Back (tooltip overlay) */}
      {flipped && (
        <div className="absolute inset-0 bg-dark/60 rounded-md flex flex-col items-center justify-center text-white text-xs px-3 py-4 z-10">
          {/* Faded background icon (safely contained) */}
          <div className="absolute inset-0 z-0 overflow-hidden rounded-md pointer-events-none">
            <div className="w-full h-full flex items-center justify-center ">
              <img
                src={iconPath}
                alt=""
                className="w-full h-full object-contain object-center blur-sm opacity-80"
                onError={e => (e.target.style.display = 'none')}
              />
            </div>
          </div>

          {/* Tooltip Info Block */}
          <div className="absolute inset-0 bg-dark/50 rounded-md flex flex-col items-center justify-center text-white text-xs z-10">
            {/* Tooltip content wrapper */}
            <div className="z-10 w-full max-h-full px-3 py-4 text-center  space-y-2  rounded-md">
              {progressValue > 0 && cell.target > 0 && (
                <p className="text-yellow-300 font-medium break-words">
                  📊 <span className="text-white">Progress:</span> {progressValue.toLocaleString()}{' '}
                  / {cell.target.toLocaleString()}
                </p>
              )}
              {isCompleted && awardedPoints > 0 && (
                <p className="text-green-300 font-medium break-words">
                  🏅 <span className="text-white">Points Awarded:</span> {awardedPoints}
                </p>
              )}

              {isCompleted && awardedPoints === 0 && (
                <>
                  <p className="font-code text-green-300 text-shadow-md break-words">
                    team Completion
                  </p>
                  <p className="italic text-white/60 break-words">No contribution</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
