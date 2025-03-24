import { useEffect, useState } from 'react';
import RepositoryCard from '../components/ui/RepositoryCard';
import { fetchRepos } from '../utils/fetchRepos';
import { privateRepos } from '../data/privateRepos';

export default function Development() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Specify which public repos you want to display
  const includedPublicRepos = ['varietyz.github.io', 'Lite-Utilities', 'literegenmeter'];

  useEffect(() => {
    fetchRepos('Varietyz', includedPublicRepos)
      .then((fetchedRepos) => {
        // Combine public fetched repos with your manually added private repos
        setRepos([...fetchedRepos, ...privateRepos]);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center text-gold mt-20">Loading repositories...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-20">Error loading repositories: {error.message}</div>;
  }

  return (
    <div className="h-screen overflow-y-auto no-scrollbar px-4 py-12 md:py-24">
      <section className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-heading text-gold text-center mb-6">
          My Development Projects
        </h2>
        <div className="border-b-2 border-gold w-24 mx-auto mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {repos.map((repo) => (
            <RepositoryCard key={repo.id} repo={repo} />
          ))}
        </div>
      </section>
    </div>
  );
}
