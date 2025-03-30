/**
 *
 * @param root0
 * @param root0.repo
 * @param root0.onClick
 */
export default function RepositoryCard({ repo, onClick }) {
  return (
    <div
      onClick={() => onClick && onClick(repo)}
      className="bg-dark border border-gold rounded-xl shadow-md p-4 cursor-pointer hover:bg-zinc-800 transition">
      {/* Title and Icon */}
      <div className="flex items-center mb-2">
        <div className="w-10 h-10 rounded-full bg-dark border border-gold p-1 mr-3 flex items-center justify-center">
          <img
            src="/assets/icons/github_logo.png" // Adjust this path to match your icon's name and location
            alt="GitHub Logo"
            className="w-full h-full rounded-full"
          />
        </div>
        <h3 className="text-gold text-xl font-bold">{repo.name}</h3>
      </div>

      {/* Description */}
      <p className="text-sm text-white my-2">{repo.description}</p>

      {/* Language and Privacy Indicator */}
      <div className="text-xs text-gray-400 mb-2">
        {repo.language} {repo.private && '• 🔒 Private Repository'}
      </div>
    </div>
  );
}
