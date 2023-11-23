import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';

// import { profileEditApi } from '../../../../../../api/Frontend/profileEditApi';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {
  actions,
  useAppDispatch,
  // useAppSelector
} from '../../../../../../store';

const TopText = () => {
  const profEditActions = actions.profileEditActions;
  const appDispatch = useAppDispatch();
  // const { loading } = useAppSelector((state) => state.profileEdit);

  const changeEditingActivate = () => {
    appDispatch(profEditActions.setEditUpdate(true));
  };

  const navigation = useNavigation();
  return (
    <>
      <View className="flex-row justify-between items-center pt-5 px-8">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View>
            <Ionicons name="chevron-back" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <Text className=" text-base text-black">Personal details</Text>
        <Text onPress={changeEditingActivate} className="text-base text-primary mr-2">
          Change
        </Text>
      </View>
    </>
  );
};
export default TopText;
