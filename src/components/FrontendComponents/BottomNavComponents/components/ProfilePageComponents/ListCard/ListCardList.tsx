import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import ListCard from './ListCard';
import loginService from '../../../../../../services/loginService';
import { logError, logInfo } from '../../../../../../utils/logger';
import removeAllScreensAndPush from '../../../../../../utils/resetStack';

const ListCardList = () => {
  const navigation = useNavigation<any>();
  const handleLogout = () => {
    // Perform logout logic here
    loginService
      .logout()
      .then((response) => {
        removeAllScreensAndPush(navigation, 'Splash');
      })
      .catch((error) => {
        logError(error);
      });
  };
  return (
    <View className="items-center p-5">
      <ListCard
        name="Orders"
        // navigation={() => {
        //   navigation.navigate('ProfileOrder');
        // }}

        navigation={() => {
          navigation.navigate('OrderDetails');
        }}
      />
      <ListCard
        name="My reviews"
        navigation={() => {
          navigation.navigate('UserReviews');
        }}
      />
      <ListCard
        name="Change Password"
        navigation={() => {
          navigation.navigate('UserChangePassword');
        }}
      />
      <ListCard name="Sign Out" navigation={handleLogout} />
    </View>
  );
};

export default ListCardList;
