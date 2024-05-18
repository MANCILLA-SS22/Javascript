import { useContext, useState } from 'react';
import { ChallengesContext } from '../store/challenges-context.jsx';
import ChallengeItem from './ChallengeItem.jsx';
import ChallengeTabs from './ChallengeTabs.jsx';
import { AnimatePresence, motion } from 'framer-motion';

export default function Challenges() {
  const { challenges } = useContext(ChallengesContext);
  const [selectedType, setSelectedType] = useState('active');
  const [expanded, setExpanded] = useState(null);

  const filteredChallenges = {
    active: challenges.filter((challenge) => challenge.status === 'active'),
    completed: challenges.filter((challenge) => challenge.status === 'completed'),
    failed: challenges.filter((challenge) => challenge.status === 'failed'),
  };

  const displayedChallenges = filteredChallenges[selectedType];

  function handleSelectType(newType) {
    setSelectedType(newType);
  }

  function handleViewDetails(id) {
    setExpanded((prevId) => {
      if (prevId === id) return null;
      return id;
    });
  };

  function displayedChallengesLength(){
    if (displayedChallenges.length > 0){
      return (
        <>
          <motion.ol className="challenge-items" key="list" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ y: -30, opacity: 0 }}>
            <AnimatePresence>
              {displayedChallengesMap()}
            </AnimatePresence>
          </motion.ol>  
        </>
      )    
    }
  }

  function displayedChallengesMap() {
    const res = displayedChallenges.map(function(challenge){
      return <ChallengeItem key={challenge.id} challenge={challenge} onViewDetails={() => handleViewDetails(challenge.id)} isExpanded={expanded === challenge.id} />
    });

    return res;
  }

  return (
    <div id="challenges">
      <ChallengeTabs challenges={filteredChallenges} onSelectType={handleSelectType} selectedType={selectedType} >
        <AnimatePresence mode='wait'>
          {displayedChallengesLength()}
        </AnimatePresence>
        {displayedChallenges.length === 0 && <motion.p key="fallback" initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -20}}>No challenges found.</motion.p>}
      </ChallengeTabs>
    </div>
  );
}
