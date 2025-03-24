export async function fetchRepos(username, includedRepos = []) {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
    );
  
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
  
    const repos = await response.json();
  
    // Filter only the repositories you explicitly include
    return repos.filter((repo) => includedRepos.includes(repo.name));
  }
  