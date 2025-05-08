// 📂 src/pages/ClanHub.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar';

const MotionLink = motion(Link);

const sections = [
  {
    label: 'Clan Members',
    path: '/varietyz-clan/members',
    icon: '/assets/osrs_ui/clan_channel.webp'
  },
  { label: 'Clan Hiscores', path: '/varietyz-clan/hiscores', icon: '/assets/osrs_ui/stats.webp' },
  {
    label: 'Skill & Boss of the Week',
    path: '/varietyz-clan/weekly',
    icon: '/assets/osrs_ui/combat.webp'
  },
  { label: 'Auto-Bingo', path: '/varietyz-clan/bingo', icon: '/assets/icons/click.webp' },
  {
    label: 'Guides/Tutorials',
    path: '/varietyz-clan/tutorials',
    icon: '/assets/osrs_ui/tutorials.webp'
  },
  { label: 'Events', path: '/varietyz-clan/events', icon: '/assets/osrs_ui/minigames_badge.webp' },
  { label: 'Analytics', path: '/varietyz-clan/analytics', icon: '/assets/osrs_ui/analytics.webp' },
  {
    label: 'Ranks Information',
    path: '/varietyz-clan/ranking',
    icon: '/assets/emojis/league_points.webp'
  },
  { label: 'Join The Clan', path: '/varietyz-clan/how-to-join', icon: '/assets/icons/varietyz.png' }
];

/**
 *
 */
export default function ClanHub() {
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : true;
  const baseOffset = 20;
  const offsetMultiplier = 1.2;
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;

  return (
    <div className=" px-4 scroll-smooth">
      <Header colorScheme="gold" />
      <Navbar colorScheme="gold" />

      <section className="max-w-4xl mx-auto space-y-6 text-center">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-gold text-center mb-6 relative"
          style={{ color: '#cea555' }}>
          Varietyz Clan Hub
          <motion.span
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(120deg, #cea555 30%, white 50%, #cea555 70%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              mixBlendMode: 'screen'
            }}
            initial={{ backgroundPositionX: '0%', opacity: 0 }}
            animate={{ backgroundPositionX: '100%', opacity: [0, 1, 0] }}
            transition={{ duration: 1.8, ease: 'easeOut' }}>
            Varietyz Clan Hub
          </motion.span>
        </h2>

        <p className="text-lg text-white/70">
          View members, achievements, competitions, and tutorials.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-2 gap-6 pt-8 w-full">
          {sections.map(({ label, path, icon }, index) => {
            const initialX = isMobile
              ? -(windowWidth * offsetMultiplier + (index + 1) * baseOffset)
              : index % 2 === 0
                ? -(windowWidth * offsetMultiplier + (index + 1) * baseOffset)
                : windowWidth * offsetMultiplier + (index + 1) * baseOffset;

            return (
              <MotionLink
                key={path}
                to={path}
                initial={{ opacity: 0, x: initialX, filter: 'blur(20px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ delay: index * 0.03, duration: 0.1, ease: 'easeOut' }}
                style={{ willChange: 'transform, opacity, filter' }}
                className=" font-osrs bg-dark border border-gold rounded-xl p-6 hover:shadow-lg transition text-gold  hover:bg-accent hover:text-dark text-lg md:text-xl flex items-center justify-center w-full h-14 md:h-15 lg:h-15 ">
                <img
                  src={icon}
                  alt={`${label} icon`}
                  className="h-5 mr-2 aspect-square object-contain"
                />
                {label}
              </MotionLink>
            );
          })}
        </div>
      </section>
    </div>
  );
}
