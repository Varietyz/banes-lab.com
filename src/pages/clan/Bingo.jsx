import { LazyMotion, domAnimation, m, useAnimation } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { fetchBingoData } from '../../api/central';
import BingoIndividual from '../../components/bingo/BingoIndividual';
import RotationTimer from '../../components/bingo/RotationTimer';
import useInView from '../../hooks/useInView';

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

/**
 * BingoHeader component
 * Displays the board title and event dates in a card-style header.
 * @param root0
 * @param root0.activeBoard
 * @param root0.activeEvent
 * @param root0.headerRef
 * @param root0.animationControls
 * @param root0.rotationEndTime
 */
function BingoHeader({ activeBoard, rotationEndTime, activeEvent, headerRef, animationControls }) {
  return (
    <m.header
      ref={headerRef}
      initial="hidden"
      animate={animationControls}
      variants={staggerContainer}
      transition={{ duration: 0.7, ease: 'backOut' }}
      className="bg-dark border border-gold rounded-xl shadow-xl p-8 mb-8 text-center">
      <h1 className="text-4xl md:text-5xl font-heading text-gold mb-2">{activeBoard.board_name}</h1>

      <p className="text-sm text-gray-400">
        {new Date(activeEvent.start_time).toLocaleString()} -{' '}
        {new Date(activeEvent.end_time).toLocaleString()}
      </p>
      <hr className="my-3 border-t border-gold/35 w-1/5 mx-auto" />

      <p className="text-sm text-gray-300 mt-1">
        Ends in:{' '}
        <span className="font-bold text-gold">
          <RotationTimer endTime={rotationEndTime} />
        </span>
      </p>
    </m.header>
  );
}

/**
 * BingoPage component
 * Combines header, controls, and main content sections. Fetches data from the API,
 * then passes the cleaned, aggregated data to child components.
 */
export default function BingoPage() {
  const [cleanedData, setCleanedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);

  const [headerRef, headerInView] = useInView({ threshold: 0.1 });
  const headerControls = useAnimation();

  useEffect(() => {
    if (headerInView) {
      headerControls.start('visible');
    }
  }, [headerInView, headerControls]);

  useEffect(() => {
    /**
     *
     */
    async function loadBingoData() {
      try {
        const data = await fetchBingoData();
        if (data.players && data.players.length > 0) {
          setSelectedPlayerId(data.players[0].player_id);
        }
        setCleanedData(data);
      } catch (error) {
        console.error('Failed to load bingo data', error);
      } finally {
        setLoading(false);
      }
    }

    loadBingoData();
  }, []);

  if (loading) {
    return <div className="text-center text-white/80 py-20">Loading Bingo...</div>;
  }
  if (!cleanedData || !cleanedData.activeBoard || !cleanedData.activeEvent) {
    return <div className="text-center text-red-400 py-20">No active Bingo event found.</div>;
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className=" px-4 sm:px-6 lg:px-8">
        <section className=" max-w-7xl mx-auto">
          <BingoHeader
            activeBoard={cleanedData.activeBoard}
            activeEvent={cleanedData.activeEvent}
            rotationEndTime={cleanedData.rotationInfo?.currentEnd}
            headerRef={headerRef}
            animationControls={headerControls}
          />

          <div className="bg-dark border border-gold rounded-xl shadow-xl p-8">
            <BingoIndividual
              cleanedData={cleanedData}
              selectedPlayerId={selectedPlayerId}
              setSelectedPlayerId={setSelectedPlayerId}
            />
          </div>
        </section>
      </div>
    </LazyMotion>
  );
}
