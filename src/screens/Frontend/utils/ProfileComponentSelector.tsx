import React from 'react';
import { View, Text } from 'react-native';

import InfoComponent from '../../../components/FrontendComponents/ProfileOrderComponents/InfoComponents/InfoComponent';
import OfferComponent from '../../../components/FrontendComponents/ProfileOrderComponents/OfferComponents/OfferComponent';
import OrderComponent from '../../../components/FrontendComponents/ProfileOrderComponents/OrderComponents/OrderComponent';
import ReviewComponent from '../../../components/FrontendComponents/ProfileOrderComponents/ReviewComponents/ReviewComponent';
import { useAppSelector } from '../../../store';

interface snpPress {
  handleSnapPress: (index: number) => void;
}

const ProfileComponentSelector = ({ handleSnapPress }: snpPress) => {
  const { index } = useAppSelector((state) => state.profileOrders);

  switch (index) {
    case 0:
      return <OrderComponent />;

    case 1:
      return <InfoComponent />;
    case 2:
      return <OfferComponent />;
    case 3:
      return <ReviewComponent handleSnapPress={handleSnapPress} />;
    default:
      return (
        <View>
          <Text>BRUH</Text>
        </View>
      );
  }
};

export default ProfileComponentSelector;
