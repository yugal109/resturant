import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';

import CircleRadio from '../../components/FrontendComponents/ReusableComponents/CircleRadio';
import UserForm from '../../components/FrontendComponents/ReusableComponents/UserForm';
import { PRIMARY_COLOR } from '../../constants';

export default function CheckoutUser() {
  const navigation = useNavigation<any>();
  return (
    <ScrollView className="p-6 bg-screenBackground">
      <View className="mb-12">
        <View className=" mx-6 ">
          {/* User details */}

          <View className=" bg-userFormGrey rounded-3xl">
            <View className="flex-row gap-3 m-1 items-baseline">
              <MaterialCommunityIcons name="account-outline" size={24} color="grey" />
              <View className="flex-1">
                <Text className="text-black/50 text-lg">Roshan Shrestha</Text>
                <Text className="text-black/50 text-lg">0495497851</Text>
                <TouchableOpacity
                  className="items-end"
                  onPress={() => navigation.navigate('UserAddressBook')}>
                  <MaterialCommunityIcons name="chevron-right" size={32} color={PRIMARY_COLOR} />
                </TouchableOpacity>
                <Text className="text-black/50 text-lg"> Kwikstraat 8</Text>
                <Text className="text-black/50 text-lg">3078 Everberg</Text>
              </View>
            </View>
          </View>
          {/* Payment detail */}
          <View className="mt-5">
            <Text className=" text-black/50 text-lg">Payment</Text>
            <View className="bg-userFormGrey p-2 rounded-3xl mt-1">
              <CircleRadio title="Cash" />
              <View className=" mx-12 mt-2 border-t border-black/50 " />
              <CircleRadio title="Online Payment" />
            </View>
          </View>

          {/* Leave a note */}
          <UserForm title="Leave a note" moreClassName="h-32" />

          {/* Terms and condition */}
          <Text className="mt-3 text-black/50">
            By confirming you agree to the terms and conditions set forth by this site, including
            our cookie policy.
          </Text>

          {/* Confirm and pay button */}
          <View className="items-center mt-5">
            <TouchableOpacity className=" bg-primary  rounded-full h-16 flex-row items-center justify-between ">
              <View className="flex-1">
                <Text className="text-secondary text-lg text-center">Confirm and Pay | €10,20</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
