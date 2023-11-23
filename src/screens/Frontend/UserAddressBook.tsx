import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native-animatable';

export default function UserAddressBook() {
  const navigation = useNavigation<any>();
  return (
    <ScrollView className=" bg-screenBackground">
      <View className="m-10 bg-userFormGrey rounded-3xl">
        {/* Address detail */}
        <View className="flex-row gap-3 m-1 items-baseline">
          <MaterialCommunityIcons name="home-outline" size={24} color="grey" />
          <View className="flex-1">
            <Text className="text-secondary/50 text-lg">Kwikstraat 8</Text>
            <Text className="text-secondary/50 text-lg">3078 Everberg</Text>
            <Text className="text-secondary/50 text-lg">Vlaams- Brabant</Text>
            <Text className="text-secondary/50 text-lg">Belgium</Text>
          </View>
        </View>

        {/* Edit and delete button */}
        <View className="flex-row justify-between mx-4 my-3">
          <TouchableOpacity className="bg-primary rounded-full w-24 items-center justify-center p-4">
            <Text className="text-awcondary">Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-delete rounded-full w-24 items-center justify-center p-4">
            <Text className="text-white ">Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* New address button */}
      <View className="items-center ">
        <TouchableOpacity
          className=" bg-primary w-80 rounded-full p-5 flex-row items-center justify-between"
          onPress={() => navigation.navigate('UserNewAddressDetail')}>
          <View className="flex-1">
            <Text className="text-secondary text-lg text-center">Add new address</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
