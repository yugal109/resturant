import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import ProfileEditPage from './ProfileEditPage';
import FollowingCard from './components/ProfilePageComponents/FollowingCard/FollowingCard';
// import FoodCriticCard from './components/ProfilePageComponents/FoodCritic/FoodCriticCard';
import ListCardList from './components/ProfilePageComponents/ListCard/ListCardList';
import TopText from './components/ProfilePageComponents/Text/TopText';
import ProfileCard from './components/ProfilePageComponents/TopProfileCard/ProfileCard';
import { profilePageApi } from '../../../api/Frontend/profilePageApi';
import { actions, useAppDispatch, useAppSelector } from '../../../store';
// import ProfileCard from './components/ProfilePageComponents/TopProfileCard/ProfileCard';
const Profilepage = () => {
  const { editing } = useAppSelector((state) => state.profileEdit);
  const { loading } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const { setLoadingStatus, setProfileData } = actions.profileActions;

  useEffect(() => {
    dispatch(setLoadingStatus());
    profilePageApi()
      .then((response: any) => {
        dispatch(setProfileData(response));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View className="flex-1 bg-screenBackground mt-20">
      {editing ? (
        <ProfileEditPage />
      ) : (
        <>
          {loading ? (
            <View>
              <Text>Loading....</Text>
            </View>
          ) : (
            <ScrollView>
              <TopText />
              <ProfileCard />
              {/* <FollowingCard /> */}
              {/* <FoodCriticCard /> */}
              <ListCardList />
            </ScrollView>
          )}
        </>
      )}
    </View>
  );
};
export default Profilepage;
