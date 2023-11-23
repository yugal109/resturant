import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import { useAppSelector } from '../../../../../store';
import { logInfo } from '../../../../../utils/logger';
import DateTimeModal from '../../../CheckoutComponents/DateTimeModal';

interface paramsType {
  sheetRefForCart: any;
  setIsOpenCart: any;
  isOpenCart: any;
  snapPointsCart: any;
  showModal: any;
  setShowModal: any;
}

const OrderComponentBottomSheet = ({
  sheetRefForCart,
  setIsOpenCart,
  isOpenCart,
  snapPointsCart,
  showModal,
  setShowModal,
}: paramsType) => {
  // const sheetRefForCart = useRef<BottomSheet>(null);
  // const [isOpenCart, setIsOpenCart] = useState<boolean>(false);
  // const snapPointsCart = ['95%'];
  // const [showModal, setShowModal] = useState(false);
  const { carts } = useAppSelector((state) => state.cartItems);
  const navigation = useNavigation<any>();

  return (
    <BottomSheet
      ref={sheetRefForCart}
      enablePanDownToClose
      onClose={() => setIsOpenCart(false)}
      snapPoints={!isOpenCart ? ['1%'] : snapPointsCart}>
      <BottomSheetView>
        <View className=" h-full">
          {/* Bottom sheet contents */}
          <ScrollView className=" h-4/5">
            <View className="mt-3">
              <Text className="text-center text-2xl font-medium">Cart</Text>

              {/* Time and date button */}
              <View className="items-center mt-5">
                <TouchableOpacity
                  className=" bg-primary w-80 rounded-full h-16 flex-row items-center"
                  onPress={() => {
                    setShowModal(true);
                    // logger('Hello');
                    logInfo('pusheddd');
                  }}>
                  <View className="flex-1">
                    <Text className="text-secondary text-lg text-center">
                      Tuesday 8 Aug at 17:00
                    </Text>
                  </View>
                  <View className="mr-4">
                    <MaterialCommunityIcons name="chevron-down" size={32} color="black" />
                  </View>
                </TouchableOpacity>
              </View>

              {showModal && <DateTimeModal setShowModal={setShowModal} showModal={showModal} />}

              <View className="flex-row justify-around mt-5">
                <View className="items-center">
                  <Text className=" text-lg">Delivery</Text>
                  <View className="bg-primary  mt-1 w-40 rounded-xl h-3">
                    <Text />
                  </View>
                </View>

                <View className="items-center">
                  <Text className=" text-lg">Pickup</Text>
                  <View className="bg-primary  mt-1 w-40  rounded-xl h-3">
                    <Text />
                  </View>
                </View>
              </View>

              <View>
                <View className="m-5">
                  {/* Title and price */}
                  <View className="flex-row items-center justify-between">
                    <Text className="text-2xl font-medium text-secondary">Vol au vent</Text>
                    <Text className="text-2xl font-medium text-secondary">€ 15,50</Text>
                  </View>

                  {/* Description and quantity increment, decrement */}
                  <View className="flex-row items-center mt-3">
                    <Text className=" text-lg font-medium flex-1 opacity-40">
                      Lorem ipsum dolor sit amet, sectetur adipiscing elit,.
                    </Text>
                    <View className=" flex-row  items-center gap-1 rounded-2xl">
                      <TouchableOpacity className="bg-primary w-11 items-center justify-center rounded-l-full">
                        <Text className=" text-secondary  font-medium text-3xl">-</Text>
                      </TouchableOpacity>

                      <View className="bg-primary w-11 items-center self-stretch justify-center ">
                        <Text className=" text-secondary font-medium text-lg ">1</Text>
                      </View>

                      <TouchableOpacity className="bg-primary w-11 items-center justify-center rounded-r-full">
                        <Text className=" text-secondary text-3xl font-medium ">+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* Price display */}
                <View className=" border-y border-secondary/30">
                  <View className="m-5">
                    <View className="flex-row items-center justify-between mt-2">
                      <Text className=" text-xl opacity-40">Subtotal</Text>
                      <Text className=" text-xl opacity-40">€ 15,20</Text>
                    </View>
                    <View className="flex-row items-center justify-between mt-2">
                      <Text className=" text-xl opacity-40">Delivery Cost</Text>
                      <Text className=" text-xl opacity-40">FREE</Text>
                    </View>
                    <View className="flex-row items-center justify-between mt-2">
                      <Text className=" text-xl opacity-40">Discountcode</Text>
                      <Text className=" text-xl opacity-40">-€ 5,00</Text>
                    </View>

                    <View className="flex-row items-center justify-between mt-2">
                      <Text className=" text-xl opacity-40">Total</Text>
                      <Text className=" text-xl opacity-40">€10,20</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Go to checkout contents */}
          <TouchableOpacity
            className="bg-primary rounded-full items-center flex-row justify-between w-11/12 h-16 self-center mb-3 px-6"
            onPress={() => navigation.navigate('CheckoutUser')}>
            <View>
              <View className="relative">
                <FontAwesome5 name="shopping-basket" size={22} color="black" />
              </View>
              <View className="absolute top-4 left-4 w-5 bg-secondary rounded-full">
                <Text className="text-primary text-center">{carts.length}</Text>
              </View>
            </View>
            <Text className=" text-lg text-secondary">Go To Checkout</Text>
            <Text className=" text-lg text-secondary font-bold">$13.45</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default OrderComponentBottomSheet;
