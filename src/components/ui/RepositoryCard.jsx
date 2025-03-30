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
      className="bg-dark border border-gold rounded-xl shadow-md p-6 cursor-pointer hover:scale-105 hover:bg-zinc-800 transition duration-300 max-w-md sm:max-w-none w-full sm:w-auto h-[300px] sm:h-[250px] flex flex-col justify-between">
      {/* Title and Icon */}
      <div className="flex items-center mb-2 space-x-4 sm:space-x-6">
        <div className="w-12 h-12 rounded-full bg-dark border border-gold p-1 flex items-center justify-center transition-all duration-300">
          <img
            src="/assets/icons/github_logo.png"
            alt="GitHub Logo"
            className="w-full h-full rounded-full"
          />
        </div>
        <h3 className="text-gold text-lg sm:text-xl font-bold truncate">{repo.name}</h3>
      </div>

      {/* Description */}
      <p className="text-sm sm:text-base text-white my-2 line-clamp-4">{repo.description}</p>

      {/* Language and Privacy Indicator */}
      <div className="text-xs sm:text-sm text-gray-400 mb-2">
        {repo.language} {repo.private && '• 🔒 Private Repository'}
      </div>
    </div>
  );
}
