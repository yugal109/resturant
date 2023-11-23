import React from 'react';

import ReviewCard from './components/ReviewCard';

interface snpPress {
  handleSnapPress: (index: number) => void;
}

const MostRelevant = ({ handleSnapPress }: snpPress) => {
  return <ReviewCard text="Anonymus" handleSnapPress={handleSnapPress} />;
};

export default MostRelevant;
