import { TouchableOpacity, Text, View, ScrollView } from 'react-native';

import CircleRadio from '../../components/FrontendComponents/ReusableComponents/CircleRadio';
import UserForm from '../../components/FrontendComponents/ReusableComponents/UserForm';

export default function CheckoutGuest() {
  return (
    <ScrollView className=" bg-screenBackground">
      <View className="mb-12">
        {/* User detail form */}
        <View className="mt-2 mx-6 ">
          <UserForm title="First Name" />
          <UserForm title="Last Name" />
          <UserForm title="Email" />
          <UserForm title="Phone Number" />

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
          <Text className="mt-5 text-secondary/50 text-lg">
            By confirming you agree to the terms and conditions set forth by this site, including
            our cookie policy.
          </Text>

          {/* Confirm and pay button */}
          <View className="items-center mt-5">
            <TouchableOpacity className=" bg-primary w-80 rounded-full p-5 flex-row items-center justify-between ">
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
