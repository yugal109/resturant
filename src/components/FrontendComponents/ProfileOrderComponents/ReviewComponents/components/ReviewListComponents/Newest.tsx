import React from 'react';
import { View, Text } from 'react-native';

import ReviewCard from './components/ReviewCard';

interface snpPress {
  handleSnapPress: (index: number) => void;
}

const Newest = ({ handleSnapPress }: snpPress) => {
  return <ReviewCard text="Newest" handleSnapPress={handleSnapPress} />;
};

export default Newest;
