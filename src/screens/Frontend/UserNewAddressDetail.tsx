import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import UserForm from '../../components/FrontendComponents/ReusableComponents/UserForm';

export default function UserNewAddressDetail() {
  return (
    <ScrollView className="px-6 bg-screenBackground ">
      <View className="mt-3 ">
        {/* Address inputs */}
        <View>
          <UserForm title="Address 1" />
          <UserForm title="Address 2" />
          <UserForm title="Postcode" />
          <UserForm title="City" />
          <UserForm title="Province" />
        </View>

        <View className="items-center my-6">
          <TouchableOpacity className=" bg-primary  rounded-full p-5 flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-secondary text-lg text-center">Save</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
