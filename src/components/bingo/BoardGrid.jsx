import React from 'react';
import BoardCell from './BoardCell';

/**
 * Bingo task grid component.
 * @param {Object} props
 * @param {Array} props.activeCells - Array of bingo board cell definitions.
 * @param {Array} props.rawPlayerProgress - Raw player progress data.
 * @param {number|null} props.currentPlayerId - Selected player's ID.
 */
export default function BoardGrid({ activeCells, rawPlayerProgress, currentPlayerId }) {
  const progressMap = new Map();
  rawPlayerProgress.forEach(p => {
    if (p.player_id === currentPlayerId) {
      progressMap.set(p.task_id, p);
    }
  });

  const cellsWithProgress = activeCells.map(cell => ({
    ...cell,
    progress: progressMap.get(cell.task_id) || null,
    isActiveMetric: !!cell.activeMetric
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 auto-rows-fr">
      {cellsWithProgress.map(cell => (
        <BoardCell
          key={cell.cell_id}
          cell={cell}
          progress={cell.progress}
          isActiveMetric={cell.isActiveMetric}
        />
      ))}
    </div>
  );
}
