import React from 'react';
import { View, Text } from 'react-native';

import ReviewCard from './components/ReviewCard';

interface snpPress {
  handleSnapPress: (index: number) => void;
}

const Highest = ({ handleSnapPress }: snpPress) => {
  return <ReviewCard handleSnapPress={handleSnapPress} text="Highest" />;
};

export default Highest;
