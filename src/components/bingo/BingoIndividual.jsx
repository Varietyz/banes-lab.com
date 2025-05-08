import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition
} from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import React, { Fragment, useEffect } from 'react';
import { calculatePatternBonus, getPatternDefinitionByKey } from '../../utils/patternRecognition';
import { formatRankTitle, getRankImagePath } from '../../utils/rankUtils';
import BoardGrid from './BoardGrid';

const generatePatternGrid = (cells, numRows = 3, numCols = 5) => {
  let result = '';
  for (let row = 0; row < numRows; row++) {
    let rowStr = '';
    for (let col = 0; col < numCols; col++) {
      const marked = cells.some(c => c.row === row && c.col === col);
      rowStr += marked ? '✅' : '❌';
    }
    result += rowStr + (row < numRows - 1 ? '\n' : '');
  }
  return result;
};

const formatPatternKey = key => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

/**
 * Renders the individual player's Bingo board and stats,
 * and, if the player is in a team, also shows team membership details.
 *
 * @param {Object} props
 * @param {Object} props.cleanedData - All data fetched from backend.
 * @param {number|null} props.selectedPlayerId - Currently selected player.
 * @param {Function} props.setSelectedPlayerId - Function to update selection.
 */
export default function BingoIndividual({ cleanedData, selectedPlayerId, setSelectedPlayerId }) {
  // Sort players by totalPoints descending
  const playerOptions = (cleanedData.players || []).sort((a, b) => b.totalPoints - a.totalPoints);
  const currentPlayer = playerOptions.find(p => p.player_id === selectedPlayerId);

  // Auto-select top player on mount or if cleanedData changes and nothing is selected
  useEffect(() => {
    if (!selectedPlayerId && playerOptions.length > 0) {
      setSelectedPlayerId(playerOptions[0].player_id);
    }
  }, [selectedPlayerId, playerOptions, setSelectedPlayerId]);

  // Compute the current player's team, if any.
  const currentPlayerTeam = cleanedData.teams.find(team =>
    team.members.some(member => member.player_id === currentPlayer?.player_id)
  );

  return (
    <div className="space-y-8 text-white px-4 sm:px-0">
      {/* Player Header */}
      <div className="relative border-b border-gray-700 pb-4 flex flex-col sm:flex-row sm:justify-between items-start gap-2 overflow-clip">
        {/* 🔷 Background logo (blurred, centered behind content) */}
        <img
          src="/assets/images/_Logo.webp"
          alt="Varietyz Logo"
          className="absolute left-1/2 -translate-x-1/2 opacity-10 blur-sm w-72 pointer-events-none select-none"
          draggable={false}
          style={{ zIndex: 0 }}
        />

        {/* 🔶 Left column (RSN & ID) */}
        <div className="z-10">
          <h2 className="text-2xl font-bold">
            {currentPlayer ? currentPlayer.rsn : 'Select a player'}
          </h2>
          <p className="text-sm text-gray-400">Player ID: {selectedPlayerId}</p>
        </div>

        {/* 🔶 Right column (stats) */}
        <div className="z-10 sm:text-right text-left w-full sm:w-auto">
          <p className="text-sm">Obtained Points: {currentPlayer?.totalPoints || 0}</p>
          <p className="text-sm">Tasks Completed: {currentPlayer?.tasksCompleted || 0}</p>
          {currentPlayer?.isClanMember ? (
            <p className="text-sm flex items-center gap-2 justify-start sm:justify-end text-gold font-body">
              <img
                src={getRankImagePath(currentPlayer.clanRank)}
                alt={currentPlayer.clanRank}
                className="w-auto h-5 inline-block"
              />
              <span>{formatRankTitle(currentPlayer.clanRank)}</span>
            </p>
          ) : (
            <p className="text-sm text-gray-400">Not a clan member</p>
          )}
        </div>
      </div>

      {/* Player Selection Dropdown */}
      <div className="mb-4">
        <label className="mr-2">Select Player:</label>
        <div className="mb-6 max-w-sm">
          <Listbox value={selectedPlayerId} onChange={setSelectedPlayerId}>
            <div className="relative">
              {/* Button that shows selected player */}
              <ListboxButton className="relative sm:w-40 h-[42px] cursor-pointer rounded border border-gold bg-gray-700 px-3 text-left font-body text-gold text-sm shadow-sm focus:outline-none flex items-center justify-between">
                <span className="flex items-center gap-2 truncate">
                  {(() => {
                    const selected = playerOptions.find(p => p.player_id === selectedPlayerId);
                    return selected ? (
                      <>
                        {selected.isClanMember && (
                          <img
                            src={getRankImagePath(selected.clanRank)}
                            alt={selected.clanRank}
                            className="w-auto h-5 shrink-0"
                          />
                        )}
                        {selected.rsn}
                      </>
                    ) : (
                      'Select Player'
                    );
                  })()}
                </span>
                <ChevronUpDownIcon className="h-5 w-5 text-white" />
              </ListboxButton>

              {/* Dropdown list */}
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <ListboxOptions className="absolute mt-1 max-h-72 w-40 overflow-auto rounded bg-dark border border-gold py-1 text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 no-scrollbar">
                  {playerOptions.map((player, index) => (
                    <ListboxOption
                      key={player.player_id}
                      value={player.player_id}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-3 px-4 transition-all duration-150 transform font-body ${
                          index % 2 === 0 ? 'bg-[#1c1c1c]' : 'bg-[#111111]'
                        } ${active ? 'bg-gold/20 text-gold rounded' : 'text-white'} hover:scale-[1.05] hover:bg-gold/85`
                      }>
                      {({ selected }) => (
                        <div className="flex items-center gap-2">
                          {player.isClanMember && (
                            <img
                              src={getRankImagePath(player.clanRank)}
                              alt={player.clanRank}
                              className="w-auto h-5"
                            />
                          )}
                          <span
                            className={`truncate text-sm ${
                              selected ? 'text-gold font-body' : 'text-white'
                            }`}>
                            {player.rsn}
                          </span>
                        </div>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>

      {/* Board Grid */}
      <BoardGrid
        activeCells={cleanedData.activeCells}
        rawPlayerProgress={cleanedData.rawPlayerProgress}
        currentPlayerId={currentPlayer?.player_id || null}
      />

      {/* Active Patterns */}
      <section>
        <h2 className="text-2xl font-bold mb-4">🎯 Active Patterns</h2>

        <div className="grid grid-cols-1 xxs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {cleanedData.activePatterns.map(({ pattern_key }) => {
            const def = getPatternDefinitionByKey(pattern_key, 3, 5);
            const cells = def?.cells || [];
            const grid = generatePatternGrid(cells);
            const points = calculatePatternBonus(def?.patternType || '');

            return (
              <div
                key={pattern_key}
                className="relative bg-gray-800 rounded-md px-3 py-2 border border-gold/20 shadow-sm h-28 flex items-center justify-center">
                {/* Top-Left: Pattern Name */}
                <p className="absolute top-2 left-2 text-white text-xs font-semibold">
                  {formatPatternKey(pattern_key)}
                </p>

                {/* Center: Emoji Grid */}
                <pre className="text-white text-sm font-mono tracking-tight leading-tight text-center">
                  {grid}
                </pre>

                {/* Bottom-Right: Points */}
                <span className="absolute bottom-2 right-2 text-yellow-300 text-[11px] font-bold">
                  +{points} pts
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {currentPlayerTeam && (
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-4">👥 Team Membership</h2>

          <div className="bg-dark border border-gold/30 rounded-xl shadow-inner px-6 py-4 space-y-4">
            {/* Team Info */}
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-white font-body">
              <p>
                🏷️ <strong>Team Name:</strong>{' '}
                <span className="text-gold font-heading">{currentPlayerTeam.team_name}</span>
              </p>
              <p>
                📊 <strong>Total Points:</strong>{' '}
                <span className="text-gold font-heading">
                  {currentPlayerTeam.aggregated.totalPoints}
                </span>
              </p>
              <p>
                ✅ <strong>Tasks Completed:</strong>{' '}
                <span className="text-gold font-heading">
                  {currentPlayerTeam.aggregated.tasksCompleted}
                </span>
              </p>
              <p>
                📈 <strong>Overall Progress:</strong>{' '}
                <span className="text-gold font-heading">
                  {currentPlayerTeam.aggregated.overallPercentage}%
                </span>
              </p>
            </div>

            <hr className="border-t border-gray-700 my-2" />

            {/* Team Members */}
            <div>
              <h3 className="text-xl font-bold mb-4">🧑‍🤝‍🧑 Team Members</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {currentPlayerTeam.members.map(member => (
                  <a
                    key={member.player_id}
                    href={`https://wiseoldman.net/players/${encodeURIComponent(member.rsn)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group bg-gray-800 border border-gold/20 rounded-xl p-5 shadow-inner flex flex-col justify-between items-center text-center min-h-[230px] transition duration-200 hover:scale-105 hover:border-gold/60 overflow-hidden">
                    {/* 🧠 Overlay Hover Blur + Text */}
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition duration-200 z-20 flex flex-col items-center justify-center text-center px-2">
                      <img
                        src="/assets/emojis/wise_old_man.webp"
                        alt="Wise Old Man"
                        className="w-10 h-10 mb-2 drop-shadow"
                      />
                      <p className="text-white text-xs font-semibold">Navigate to</p>
                      <span className="text-gold text-md font-body">Wise Old Man</span>
                    </div>

                    {/* Profile Header */}
                    <div className="text-center mb-2">
                      <h4 className="text-xl font-heading font-bold text-gold truncate">
                        {member.rsn}
                      </h4>
                      <p className="text-white/60 text-xs font-mono">ID: {member.player_id}</p>
                    </div>

                    {/* Stat Block */}
                    <ul className="text-sm text-gray-300 font-body space-y-2 text-center">
                      {/* Divider */}
                      <li className=" border-t border-gray-700" />

                      <li>
                        🏆 <strong>Total:</strong>{' '}
                        <span className="text-gold font-bold">{member.allTimePoints}</span>
                        <span className="text-white/40 text-xs ml-1">points</span>
                      </li>

                      {/* Divider */}
                      <li className="pt-2 border-t border-gray-700" />

                      <li>
                        📊 <strong>Contributing:</strong>{' '}
                        <span className="text-gold font-bold">{member.overallPercentage}%</span>
                      </li>

                      <li>
                        🎯 <strong>Obtained:</strong>{' '}
                        <span className="text-gold font-bold">{member.totalPoints}</span>
                        <span className="text-white/40 text-xs ml-1">points</span>
                      </li>

                      {/* Divider */}
                      <li className="pt-2 border-t border-gray-700" />

                      <li>
                        📅 <strong>Participated in</strong>{' '}
                        <span className="text-gold font-bold">{member.eventsParticipated}</span>
                        <span className="text-white/40 text-xs ml-1">events</span>
                      </li>

                      <li>
                        🎲 <strong>Contributed to</strong>{' '}
                        <span className="text-gold font-bold">{member.contributedTasks}</span>
                        <span className="text-white/40 text-xs ml-1">tasks</span>
                      </li>
                    </ul>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
