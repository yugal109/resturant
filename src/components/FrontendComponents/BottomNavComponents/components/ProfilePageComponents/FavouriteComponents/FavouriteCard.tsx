import { AntDesign, Entypo, Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import React, { useMemo, useState } from 'react';
import { View, Image, Text } from 'react-native';

import { MenuWiseLocationInterface } from '../../../../../../api/apiTypes';
import { PRIMARY_COLOR } from '../../../../../../constants';
import { actions, useAppDispatch } from '../../../../../../store';

interface propsInterface {
  location: MenuWiseLocationInterface;
  navigation: any;
}

const FavouriteCardComponent = ({ location, navigation }: propsInterface) => {
  const [fav, setFav] = useState<boolean | null>(false);
  const appDispatch = useAppDispatch();

  useMemo(() => {
    setFav(location.following);
  }, []);

  const showSnackBar = (name: string) => {
    if (fav === true) {
      setFav(false);
      appDispatch(
        actions.homeActions.setSnackBarVisibile({
          hideshow: true,
          text: 'Removed From Favourites.',
          color: 'grey',
        })
      );
      appDispatch(actions.favouriteActions.removeFavourite(name));
    } else {
      setFav(true);
      appDispatch(
        actions.homeActions.setSnackBarVisibile({
          hideshow: true,
          text: 'Added To Favourites.',
          color: PRIMARY_COLOR,
        })
      );
    }

    setTimeout(() => {
      appDispatch(
        actions.homeActions.setSnackBarVisibile({
          hideshow: false,
          text: '',
          color: '',
        })
      );
    }, 2000);
  };

  return (
    <View className="flex-1 ">
      <View className="flex-row items-center px-4 pt-2 m-2">
        <Image
          source={require('./../../../../../../../assets/Ellipse.png')}
          className="mr-4 h-20 w-20"
        />
        <View className="flex-1">
          <TouchableOpacity onPress={() => navigation.navigate('ProfileOrder')}>
            <Text className=" text-lg font-bold text-black">{location.name}</Text>
          </TouchableOpacity>

          <Text className=" text-sm text-grey">{location.description}</Text>

          <View className="flex-row items-center ml-1">
            <FontAwesome name="star" size={24} style={{ marginRight: 4 }} color={PRIMARY_COLOR} />
            <Text className="text-primary text-sm mr-1">{location.rate}</Text>
            <Text className="text-sm text-grey">(255)</Text>
            <Text className="text-sm text-primary ml-3 ">Following</Text>
            {fav !== null && (
              <>
                <AntDesign
                  name={fav === true ? 'heart' : 'hearto'}
                  style={{ fontSize: 16, color: PRIMARY_COLOR, marginLeft: 9 }}
                  onPress={() => showSnackBar(location.name)}
                  size={24}
                />
              </>
            )}
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

export default FavouriteCardComponent;
