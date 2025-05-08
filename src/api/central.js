/**
 *
 */
export async function fetchClanMembers() {
  try {
    const res = await fetch('https://banes-lab.com:3003/data/members');
    const json = await res.json();
    return json.members || [];
  } catch (err) {
    console.error('Error fetching competition data:', err);
    return [];
  }
}

/**
 * Fetches weekly competition data.
 * Handles errors and returns an empty array on failure.
 *
 * @returns {Promise<Competition[]>}
 */
export async function fetchCompetitions() {
  try {
    const res = await fetch('https://banes-lab.com:3003/competitions/week');
    const json = await res.json();
    return json.competition || [];
  } catch (err) {
    console.error('Error fetching competition data:', err);
    return [];
  }
}

/**
 * @module api/bingo
 *
 * Provides a reusable service to fetch Bingo data.
 */
export async function fetchBingoData() {
  // Use an environment variable, with a fallback to your default endpoint.
  const endpoint = 'https://banes-lab.com:3003/bingo/data';

  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Error fetching bingo data: ${response.statusText}`);
  }

  const data = await response.json();

  // Sort players by highest totalPoints first (if applicable)
  if (data.players && Array.isArray(data.players) && data.players.length > 0) {
    data.players.sort((a, b) => b.totalPoints - a.totalPoints);
  }

  return data;
}
