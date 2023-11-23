import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ActivityIndicator, Snackbar } from 'react-native-paper';

import TabViewOrderComponent from './TabViewOrderComponent';
import AddToCartComponent from './components/AddToCartComponent';
import OrderComponentBottomSheet from './components/OrderComponentBottomSheet';
import { RestaurantProfileMenuInterface } from '../../../../api/Frontend/apiTypes/baseFrontEndApiType';
import { profileMenuApi } from '../../../../api/Frontend/profileOrderApi';
import { actions, useAppDispatch, useAppSelector } from '../../../../store';
import { logger } from '../../../../utils';
import { logError, logInfo } from '../../../../utils/logger';
import DateTimeModal from '../../CheckoutComponents/DateTimeModal';

const OrderComponent = () => {
  const sheetRef = useRef<BottomSheet>(null);
  const sheetRefForCart = useRef<BottomSheet>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenCart, setIsOpenCart] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const snapPoints = ['80%'];
  const snapPointsCart = ['95%'];

  const appDispatch = useAppDispatch();
  const { carts } = useAppSelector((state) => state.cartItems);

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
    setIsOpen(true);
  }, []);

  const handleSnapPressClose = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
    setIsOpen(false);
  }, []);

  const handleSnapPressCart = useCallback((index: number) => {
    setIsOpenCart(true);
    sheetRefForCart.current?.snapToIndex(index);
  }, []);

  const { loading } = useAppSelector((state) => state.profileOrderOrder);

  useEffect(() => {
    appDispatch(actions.profileOrderOrderActions.setLoading());

    profileMenuApi()
      .then((response: RestaurantProfileMenuInterface) => {
        appDispatch(actions.profileOrderOrderActions.setMenus(response));
      })
      .catch((error) => {
        // logError(error);
      });

    // profileOrderOrderMenuWiseLocation(0)
    //   .then((response: any) => {
    //     appDispatch(actions.profileOrderOrderActions.setLocations(response));
    //   })
    //   .catch((error) => {
    //     logError(error);
    //   });
  }, []);

  return (
    <>
      {loading ? (
        <View style={{ padding: 30 }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View>
          <TabViewOrderComponent handlePress={handleSnapPress} />
          {/* <ProfileSearchListItem /> */}
          {/* <ProfileBottomComponent handlePress={handleSnapPress} /> */}
        </View>
      )}

      <BottomSheet
        ref={sheetRef}
        enablePanDownToClose
        onClose={() => setIsOpen(false)}
        snapPoints={!isOpen ? ['1%'] : snapPoints}>
        <BottomSheetView>
          <AddToCartComponent handleSnapPress={handleSnapPressClose} />
        </BottomSheetView>
      </BottomSheet>

      {carts && carts.length > 0 && isOpen === false && (
        <Snackbar
          visible
          onDismiss={() => {}}
          className=" bg-primary rounded-full h-16 w-96 items-center px-4 self-center"
          // action={{
          //   label: 'Undo',
          //   onPress: () => {
          //     // Do something
          //   },
          // }}
        >
          <TouchableOpacity
            onPress={() => {
              handleSnapPressCart(0);
            }}>
            <View className="flex-row items-center justify-between">
              <View className="flex-row">
                <View className="relative">
                  <FontAwesome5 name="shopping-basket" size={22} color="black" />
                </View>
                <View className="absolute top-4 left-4 w-5 bg-secondary rounded-full">
                  <Text className="text-primary text-center">{carts.length}</Text>
                </View>
              </View>
              <Text className=" text-lg text-secondary">Go To Basket</Text>
              <Text className=" text-lg text-secondary font-bold">$13.45</Text>
            </View>
          </TouchableOpacity>
        </Snackbar>
      )}
      <OrderComponentBottomSheet
        setShowModal={setShowModal}
        showModal={showModal}
        sheetRefForCart={sheetRefForCart}
        isOpenCart={isOpenCart}
        snapPointsCart={snapPointsCart}
        setIsOpenCart={setIsOpenCart}
      />
    </>
  );
};

export default OrderComponent;
