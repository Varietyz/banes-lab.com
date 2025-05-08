// /utils/bingoPatternRecognition.js
import {
  getBothDiagonalsPattern,
  getCheckerboardPattern,
  getCornersPattern,
  getCrossPattern,
  getDiagonalCrosshatch,
  getDiagonalPatterns,
  getFullBoardPattern,
  getInversedCheckerboardPattern,
  getLinePatterns,
  getMultipleLinesPattern,
  getOuterBorderPattern,
  getVarietyzPattern,
  getXPattern,
  getZigZagPattern
} from './bingoPatterns';

/**
 * 🎲 Calculate Extra Points for Patterns
 * @param {string} patternType - Type of Bingo Pattern
 * @returns {number} - Bonus Points for the Pattern
 */
export function calculatePatternBonus(patternType) {
  switch (patternType) {
    case 'line':
      return 40; // Simpler pattern: lower bonus
    case 'multiple_lines':
      return 120; // Slightly more challenging than a single line
    case 'diagonal':
      return 100; // Fewer cells in a diagonal on a 3x5, so lower bonus
    case 'both_diagonals':
      return 220; // Completing both diagonals is tougher
    case 'corners':
      return 180; // Four corners can be strategic but not as hard as full board
    case 'cross':
      return 260; // Middle row and column requires covering more area
    case 'x_pattern':
      return 180; // A well-formed X, but still similar in difficulty to corners
    case 'diagonal_crosshatch':
      return 240; // Overlapping diagonals, slightly harder than a single diagonal
    case 'checkerboard':
      return 450; // Requires a specific alternating pattern across the board
    case 'inversed_checkerboard':
      return 450; // Same as checkerboard but inverted
    case 'checkerboard_varietyz':
      return 600; // More challenging variation of the checkerboard pattern
    case 'outer_border':
      return 600; // Covering the entire border is a large commitment
    case 'zigzag':
      return 600; // Zigzag patterns across a rectangular board can be tricky
    case 'full_board':
      return 1000; // Completing every cell is the most challenging
    default:
      return 0;
  }
}

/**
 * Helper: getPatternDefinitionByKey
 * Returns the pattern definition (object with 'cells') for a given patternKey.
 * This mapping can be extended as needed.
 *
 * @param {string} patternKey
 * @param {number} numRows
 * @param {number} numCols
 * @returns {Object|null} - Pattern definition or null if not found.
 */
export function getPatternDefinitionByKey(patternKey, numRows, numCols) {
  const linePatterns = getLinePatterns(numRows, numCols);
  const multiLinePatterns = getMultipleLinesPattern(numRows, numCols);
  const xPatterns = getXPattern(numRows, numCols);

  const patterns = [
    ...linePatterns,
    ...multiLinePatterns,
    ...xPatterns,
    getBothDiagonalsPattern(numRows, numCols)[0],
    getCornersPattern(numRows, numCols),
    getCrossPattern(numRows, numCols),
    getOuterBorderPattern(numRows, numCols),
    getFullBoardPattern(numRows, numCols),
    getCheckerboardPattern(numRows, numCols),
    getInversedCheckerboardPattern(numRows, numCols),
    getVarietyzPattern(numRows, numCols)[0],
    getZigZagPattern(numRows, numCols),
    getDiagonalCrosshatch(numRows, numCols),
    ...getDiagonalPatterns(numRows, numCols)
  ];

  const patternMap = Object.fromEntries(
    patterns.filter(p => p?.patternKey).map(p => [p.patternKey, p])
  );

  // Alias fallback logic
  const aliasMap = {
    diagonal: 'diag_main',
    diag_main: 'diag_main',
    x_pattern: 'x_pattern_alternating',
    line: 'row_0' // default to row_0
  };

  const keyToUse = patternMap[patternKey]
    ? patternKey
    : aliasMap[patternKey] && patternMap[aliasMap[patternKey]]
      ? aliasMap[patternKey]
      : null;

  return keyToUse ? patternMap[keyToUse] : null;
}
