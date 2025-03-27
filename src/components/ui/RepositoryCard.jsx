export default function RepositoryCard({ repo, onClick }) {
  return (
    <div
      onClick={() => onClick && onClick(repo)}
      className="bg-dark border border-gold rounded-xl shadow-md p-4 cursor-pointer hover:bg-zinc-800 transition">
      <h3 className="text-gold text-xl font-bold">{repo.name}</h3>
      <p className="text-sm text-white my-2">{repo.description}</p>

      <div className="text-xs text-gray-400 mb-2">
        {repo.language} {repo.private && '• 🔒 Private Repository'}
      </div>

      <div className="text-right">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()} // 🛑 Prevent triggering modal when clicking link
          className="text-gold hover:text-accent text-sm underline">
          View on GitHub
        </a>
      </div>
    </div>
  );
}
