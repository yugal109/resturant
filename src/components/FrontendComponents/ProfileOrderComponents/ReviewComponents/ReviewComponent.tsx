import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import OverallReview from './components/OverallReview';
import ReviewList from './components/ReviewList';
import { reviewsApi } from '../../../../api/Frontend/reviewsApi';
import { actions, useAppDispatch, useAppSelector } from '../../../../store';

interface snpPress {
  handleSnapPress: (index: number) => void;
}

const ReviewComponent = ({ handleSnapPress }: snpPress) => {
  const { loading } = useAppSelector((state) => state.review);

  return (
    <View className="flex-1 w-full">
      <OverallReview />
      <ReviewList handleSnapPress={handleSnapPress} />
    </View>
  );
};

export default ReviewComponent;
