// Dynamically import all .webp files in /public/assets/ranks/
const rankImageImports = import.meta.glob('/public/assets/ranks/*.webp', {
  eager: true,
  as: 'url'
});

const normalizedRankImageMap = Object.entries(rankImageImports).reduce((acc, [path, url]) => {
  const fileName = path.split('/').pop().replace('.webp', '');
  const normalized = fileName.toLowerCase().replace(/[^a-z0-9]/g, '');
  acc[normalized] = url;
  return acc;
}, {});

/**
 * Normalize any rank and return its corresponding image URL
 * @param rawRank
 */
export const getRankImagePath = rawRank => {
  if (!rawRank) return normalizedRankImageMap['default'] ?? '/assets/ranks/default.webp';

  const normalized = rawRank.toLowerCase().replace(/[^a-z0-9]/g, '');
  return (
    normalizedRankImageMap[normalized] ??
    normalizedRankImageMap['default'] ??
    '/assets/ranks/default.webp'
  );
};

/**
 * Normalize a raw rank (e.g. "deputy_owner") to "Deputy Owner"
 * @param {string} rawRank
 * @returns {string}
 */
export const formatRankTitle = rawRank => {
  if (!rawRank) return '';
  return rawRank
    .toLowerCase()
    .replace(/[^a-z0-9_ ]/g, '')
    .replace(/[_\s]+/g, ' ') // Convert underscores and multiple spaces
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
