// utils/healthColors.js
/**
 *
 * @param grade
 */
export function getColorByGrade(grade) {
  switch (grade) {
    case 'A+':
      return 'text-green-400';
    case 'A':
      return 'text-green-300';
    case 'B':
      return 'text-yellow-300';
    case 'C':
      return 'text-orange-400';
    case 'D':
      return 'text-rose-400';
    case 'F':
      return 'text-red-500';
    default:
      return 'text-gold';
  }
}

/**
 *
 * @param value
 */
export function getColorByPercent(value) {
  if (value >= 90) return 'text-green-400';
  if (value >= 75) return 'text-yellow-300';
  if (value >= 50) return 'text-orange-400';
  return 'text-red-500';
}

/**
 *
 * @param value
 */
export function getInactivityColor(value) {
  if (value >= 30) return 'text-red-500';
  if (value >= 20) return 'text-orange-400';
  if (value >= 10) return 'text-yellow-300';
  return 'text-green-400';
}

/**
 *
 * @param value
 * @param thresholds
 */
export function getColorByLoad(value, thresholds = { low: 50, high: 80 }) {
  if (value < thresholds.low) return 'text-green-400';
  if (value < thresholds.high) return 'text-yellow-300';
  return 'text-red-500';
}
