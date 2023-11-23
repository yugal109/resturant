import { Entypo, Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Image, Text } from 'react-native';

import { PRIMARY_COLOR } from '../../../../constants';

// import { useAppSelector } from '../../../../store';

const FirstRoutes = () => {
  const navigation = useNavigation<any>();
  // const { allLocations } = useAppSelector((state) => state.home);
  return (
    <View className="flex-1 ">
      <View className="flex-row items-center px-4 pt-2 m-2">
        <Image source={require('../../../../../assets/Ellipse.png')} className="mr-4 h-20 w-20" />
        <View className="flex-1">
          <TouchableOpacity onPress={() => navigation.navigate('ProfileOrder')}>
            <Text className=" text-lg font-bold text-black">Brasserie Pakenhof</Text>
          </TouchableOpacity>
          <Text className=" text-sm text-grey">Burgers, Pasta, American Style Pizza </Text>

          <View className="flex-row items-center ml-1">
            <FontAwesome name="star" size={24} style={{ marginRight: 4 }} color={PRIMARY_COLOR} />
            <Text className="text-primary text-sm mr-1">4.5</Text>
            <Text className="text-sm text-grey">(255)</Text>
            <Text className="text-sm text-primary ml-3 ">Following</Text>
            <FontAwesome name="heart" color={PRIMARY_COLOR} style={{ marginLeft: 8 }} size={17} />
          </View>
          <View className="flex-row items-center ml-1">
            <Ionicons name="ios-bicycle" size={24} color="grey" />
            <Text className="text-sm text-grey font-bold ml-2">Free</Text>
            <Feather style={{ marginLeft: 12 }} name="credit-card" size={24} color="grey" />
            <Text className="text-sm text-grey font-bold ml-2">Min.$10.00</Text>
          </View>
          <View className="flex-row items-center ml-1">
            <Entypo name="back-in-time" size={24} color="grey" />
            <Text className="text-sm text-grey font-bold ml-2">20-40 min</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FirstRoutes;
