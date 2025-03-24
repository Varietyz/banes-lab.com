export default function RepositoryCard({ repo }) {
    return (
      <div className="bg-dark border border-gold rounded-xl shadow-md p-4">
        <h3 className="text-gold text-xl font-bold">{repo.name}</h3>
        <p className="text-sm text-white my-2">{repo.description}</p>
        <div className="text-xs text-gray-400 mb-2">
          {repo.language} {repo.private && '• 🔒 Private Repository'}
        </div>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-gold hover:text-accent transition"
        >
          View on GitHub
        </a>

      </div>
    );
  }
  