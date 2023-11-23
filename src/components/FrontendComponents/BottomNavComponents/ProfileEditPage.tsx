import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';

import { Customer } from '../../../api/Frontend/apiTypes/profileApiTypes';
import { profileEditApi } from '../../../api/Frontend/profileEditApi';
import { actions, useAppDispatch, useAppSelector } from '../../../store';
import { logError, logInfo } from '../../../utils/logger';
import UserForm from '../ReusableComponents/UserForm';
import UserProfileForm from '../ReusableComponents/UserProfileForm';

const ProfileEditPage = () => {
  const appDispatch = useAppDispatch();
  const profileEditActions = actions.profileEditActions;
  const deactivateProfileChange = () => {
    appDispatch(profileEditActions.setEditUpdate(false));
  };

  const { profileData } = useAppSelector((state) => state.profile);

  const [initialProfileInfo, setInitialProfileInfo] = useState<Customer | null>(null);

  const { loading } = useAppSelector((state) => state.profileEdit);

  useEffect(() => {
    if (profileData) {
      setInitialProfileInfo(profileData?.customer);
    }
  }, [profileData]);

  const updateProfile = () => {
    appDispatch(profileEditActions.startProfileEditLoading());
    profileEditApi()
      .then((response: any) => {
        logInfo(response);
        appDispatch(profileEditActions.startProfileEditLoaded(response));
      })
      .catch((error) => {
        logError(error);
      });
  };

  const changeProfileInfo = () => {};

  return (
    <ScrollView>
      <View className="flex-row justify-between ml-4 mr-4 items-center">
        <Text onPress={deactivateProfileChange} className="text-lg ">
          Back
        </Text>
        <TouchableOpacity onPress={updateProfile} style={{}}>
          <Text className="text-lg text-primary">{loading ? 'Load...' : 'Done'}</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-3 items-center">
        <Image
          source={require('../../../../assets/Profile.png')}
          className=" w-24 h-24 mr-3 rounded-lg"
        />
        <Text className="text-primary text-lg mt-3 mb-3">Edit Picture</Text>
      </View>
      <View className="mx-5">
        <UserProfileForm
          title="First Name"
          value={initialProfileInfo?.first_name!}
          changeProfileInfo={changeProfileInfo}
        />

        <UserProfileForm
          title="Last Name"
          value={initialProfileInfo?.last_name!}
          changeProfileInfo={changeProfileInfo}
        />

        <UserProfileForm
          title="Email"
          value={initialProfileInfo?.email!}
          changeProfileInfo={changeProfileInfo}
        />

        <UserProfileForm
          title="Telephone"
          value={initialProfileInfo?.telephone!}
          changeProfileInfo={changeProfileInfo}
        />

        <View className="items-center">
          <TouchableOpacity className="my-4">
            <Text className="text-red-500 text-base">Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileEditPage;
