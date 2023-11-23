import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { actions, useAppDispatch, useAppSelector } from '../../../../../store';
import CircleRadio from '../../../ReusableComponents/CircleRadio';
import SquareRadio from '../../../ReusableComponents/SquareRadio';

interface paramsType {
  handleSnapPress: (index: number) => void;
}

const AddToCartComponent = ({ handleSnapPress }: paramsType) => {
  const appDispatch = useAppDispatch();
  const { itemForOrder } = useAppSelector((state) => state.profileOrderOrder);
  const { itemForOrderDecrease, itemForOrderIncrease } = actions.profileOrderOrderActions;
  const { setAddToCartFromBottomSheet } = actions.cartActions;
  const dispatch = useAppDispatch();
  return (
    <View className="">
      <ScrollView className=" m-5 mb-14">
        <View>
          <View>
            <View className="flex-row items-center justify-between">
              <Text className=" text-2xl">Vol au vent</Text>
              <Text className="text-primary text-2xl">$ 15,50</Text>
            </View>

            <Text className="text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Text>
          </View>
          <View className="my-2">
            <Text className="font-bold text-base">Keuze saus</Text>
            {/* circle radio Items */}
            <CircleRadio title="Zonder saus" />
            <CircleRadio title="Look" />
            <CircleRadio title="Ketchup" />
            <CircleRadio title="Andalous" />
            <CircleRadio title="Samoerai" />
          </View>
          <View className="my-2">
            <Text className="font-bold text-base">Keuze saus</Text>
            {/* square button Items */}
            <SquareRadio title="Sia" />
            <SquareRadio title="Ajuin" />
            <SquareRadio title="Wortel" />
            <SquareRadio title="Witte Kool" />
            <SquareRadio title="Tomaten" />
          </View>
          <View className="my-2">
            <Text className="font-bold text-base">Extra's</Text>
            {/* Items */}
            <SquareRadio title="Zonder saus $2,00" />
            <SquareRadio title="Look $2,00" />
            <SquareRadio title="Ananus $2,00" />
          </View>
        </View>
      </ScrollView>
      {/* bottom add and deduct item */}
      <View className="absolute bottom-0 border-t border-t-grey/25 w-full bg-white">
        <View className="m-3">
          <View className="flex-row justify-between items-center ">
            <View className=" flex-row  items-center gap-1 rounded-2xl">
              <TouchableOpacity
                className="bg-primary w-11 items-center justify-center rounded-l-full"
                onPress={() => appDispatch(itemForOrderDecrease())}>
                <Text className=" text-secondary  font-medium text-3xl">-</Text>
              </TouchableOpacity>

              <View className="bg-primary w-11 items-center self-stretch justify-center ">
                <Text className=" text-secondary font-medium text-lg ">{itemForOrder}</Text>
              </View>

              <TouchableOpacity
                className="bg-primary w-11 items-center justify-center rounded-r-full"
                onPress={() => {
                  appDispatch(itemForOrderIncrease());
                }}>
                <Text className=" text-secondary text-3xl font-medium ">+</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                dispatch(setAddToCartFromBottomSheet(itemForOrder));
                handleSnapPress(0);
              }}>
              <Image source={require('../../../../../../assets/cart.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddToCartComponent;
