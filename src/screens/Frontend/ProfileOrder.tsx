import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useCallback, useEffect, useRef } from 'react';
import { View } from 'react-native';

import CustomDrawerContent from './utils/CutomDrawerComponent';
import ProfileComponentSelector from './utils/ProfileComponentSelector';
import { ResturantProfilePageTopInterface } from '../../api/Frontend/apiTypes/baseFrontEndApiType';
import { restaurantPageTopApi } from '../../api/Frontend/profileOrderApi';
import ProfileOrderListItems from '../../components/FrontendComponents/ProfileOrderComponents/ProfileOrderListItems';
import ProfileTopComponent from '../../components/FrontendComponents/ProfileOrderComponents/ProfileTopComponent';
import ProfileTopSkeletonComponent from '../../components/FrontendComponents/ProfileOrderComponents/ProfileTopSkeleteonComponent';
import ReviewComment from '../../components/FrontendComponents/ProfileOrderComponents/ReviewComponents/components/ReviewCommentComponents/ReviewComment';
import { PRIMARY_COLOR } from '../../constants';
import { actions, useAppDispatch, useAppSelector } from '../../store';
import { logger } from '../../utils';
import { logError } from '../../utils/logger';
const Drawer = createDrawerNavigator();

const ProfileOrder = () => {
  const sheetRef = useRef<BottomSheet>(null);
  const appDispatch = useAppDispatch();
  const { reviewTabOpenClose, loading } = useAppSelector((state) => state.profileOrders);

  const { openTab, closeTab, startLoading, setTopHalfData } = actions.profileOrderActions;
  const snapPoints = ['90%'];

  const handleSnapPress = useCallback((index: number) => {
    appDispatch(openTab());
    sheetRef.current?.snapToIndex(index);
  }, []);

  useEffect(() => {
    appDispatch(startLoading());
    restaurantPageTopApi()
      .then((response: ResturantProfilePageTopInterface) => {
        appDispatch(setTopHalfData(response));
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
        // logError(error);
      });
    return () => {
      appDispatch(actions.profileOrderOrderActions.setMenusEmpty());
    };
  }, []);

  return (
    <>
      <View className=" flex-1 items-center bg-screenBackground ">
        {loading ? <ProfileTopSkeletonComponent /> : <ProfileTopComponent />}
        <ProfileOrderListItems />
        <ProfileComponentSelector handleSnapPress={handleSnapPress} />

        {/* for reviews and things  */}
        <BottomSheet
          ref={sheetRef}
          enablePanDownToClose
          onClose={() => closeTab()}
          snapPoints={!reviewTabOpenClose ? ['1%'] : snapPoints}>
          <BottomSheetView>
            {/* <Text onPress={() => appDispatch(closeTab())}>Close</Text> */}
            <ReviewComment />
          </BottomSheetView>
        </BottomSheet>
        {/* for reviews and things  */}
      </View>
    </>
  );
};

export default ProfileOrder;
