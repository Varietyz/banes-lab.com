import { useEffect, useState } from 'react';
import RepositoryCard from '../components/ui/RepositoryCard';
import { fetchRepos } from '../utils/fetchRepos';
import { privateRepos } from '../data/privateRepos';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion'; // ✅ Importing Framer Motion
import '../styles/markdown.css';

/**
 *
 */
export default function Development() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [readmeContent, setReadmeContent] = useState('');
  const [readmeLoading, setReadmeLoading] = useState(false);

  const includedPublicRepos = [
    'banes-lab.com',
    'Lite-Utilities',
    'literegenmeter',
    'Discord-Bot-Varietyz',
    'banes-lab-bot'
  ];

  useEffect(() => {
    fetchRepos('Varietyz', includedPublicRepos)
      .then(fetchedRepos => {
        setRepos([...fetchedRepos, ...privateRepos]);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  const handleCardClick = async repo => {
    setSelectedRepo(repo);
    setReadmeLoading(true);

    try {
      const localPath = `/data/readmes/${repo.name}.md`;
      const res = await fetch(localPath);

      if (!res.ok) {
        throw new Error(`Failed to load README from ${localPath}`);
      }

      const text = await res.text();
      setReadmeContent(text);
    } catch (err) {
      console.error(err);
      setReadmeContent('# Error\nREADME not found for this project.');
    } finally {
      setReadmeLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedRepo(null);
    setReadmeContent('');
  };

  if (loading) {
    return <div className="text-center text-gold mt-20">Loading repositories...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-20">
        Error loading repositories: {error.message}
      </div>
    );
  }

  return (
    <motion.div
      className="px-4 scroll-smooth"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}>
      <section className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-gold text-center mb-6">
          My Development Projects
        </h2>

        <div className="border-b-2 border-gold w-24 mx-auto mb-8" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-6 lg:px-8">
          {repos.map(repo => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: repos.indexOf(repo) * 0.1 }}>
              <RepositoryCard repo={repo} onClick={handleCardClick} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Markdown Modal */}
      {selectedRepo && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 sm:p-6 lg:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeModal}>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="bg-dark text-white max-w-full sm:max-w-3xl w-full max-h-[80vh] overflow-y-auto no-scrollbar rounded-xl p-4 sm:p-6 relative"
            onClick={e => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-white text-2xl font-bold">
              &times;
            </button>

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-heading text-gold">{selectedRepo.name}</h3>

              {selectedRepo.html_url && (
                <a
                  href={selectedRepo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gold text-dark py-2 px-4 rounded-lg shadow-md transition hover:bg-accent mr-6">
                  View on GitHub
                </a>
              )}
            </div>

            {readmeLoading ? (
              <div className="text-center text-gold">Loading README...</div>
            ) : (
              <div className="markdown-body bg-dark text-white p-4 sm:p-6 rounded-md max-w-full overflow-x-auto">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{readmeContent}</ReactMarkdown>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
