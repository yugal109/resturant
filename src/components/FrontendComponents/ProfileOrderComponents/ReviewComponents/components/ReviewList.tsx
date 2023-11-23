import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

import Highest from './ReviewListComponents/Highest';
import Lowest from './ReviewListComponents/Lowest';
import MostRelevant from './ReviewListComponents/MostRelevant';
import Newest from './ReviewListComponents/Newest';
import { reviewsApi } from '../../../../../api/Frontend/reviewsApi';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../../../constants';
import { actions, useAppDispatch, useAppSelector } from '../../../../../store';
import { logError } from '../../../../../utils/logger';

type paramsList = {
  MostRelevant: undefined;
  Newest: undefined;
  Highest: undefined;
  Lowest: undefined;
};
const Tab = createMaterialTopTabNavigator<paramsList>();

interface snpPress {
  handleSnapPress: (index: number) => void;
}

const ReviewList = ({ handleSnapPress }: snpPress) => {
  const { loading } = useAppSelector((state) => state.review);
  const appDispatch = useAppDispatch();

  useEffect(() => {
    appDispatch(actions.reviewActions.startReviewsFetch());
    reviewsApi()
      .then((response) => {
        appDispatch(actions.reviewActions.successMostRelevantReviews(response));
      })
      .catch((error) => {
        logError(error);
      });
  }, []);

  return (
    <>
      {loading ? (
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 30 }}>Loading...</Text>
        </View>
      ) : (
        <Tab.Navigator
          screenOptions={{
            tabBarScrollEnabled: true,
            tabBarItemStyle: {
              width: 'auto',
            },
            tabBarStyle: {
              backgroundColor: 'transparent',
              alignSelf: 'center',
              flexDirection: 'row',
            },
            tabBarIndicatorStyle: {
              backgroundColor: PRIMARY_COLOR,
              height: 3,
            },
            tabBarInactiveTintColor: SECONDARY_COLOR,
            tabBarActiveTintColor: PRIMARY_COLOR,
          }}>
          <Tab.Screen
            name="MostRelevant"
            children={() => <MostRelevant handleSnapPress={handleSnapPress} />}
          />
          <Tab.Screen name="Newest" children={() => <Newest handleSnapPress={handleSnapPress} />} />
          <Tab.Screen
            name="Highest"
            children={() => <Highest handleSnapPress={handleSnapPress} />}
          />
          <Tab.Screen name="Lowest" children={() => <Lowest handleSnapPress={handleSnapPress} />} />
        </Tab.Navigator>
      )}
    </>
  );
};

export default ReviewList;
