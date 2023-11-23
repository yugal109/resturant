import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';

type iconNames = 'chevron-left' | 'menu';

interface CustomerHeaderProps {
  moreclassName?: string;
  iconName: string;
  title: string;
  navigation(): void;
}

function CustomerHeader({ moreclassName, iconName, title, navigation }: CustomerHeaderProps) {
  return (
    <View className={`flex-row flex-1 justify-between items-center w-full ${moreclassName}`}>
      <TouchableOpacity onPress={navigation}>
        <MaterialCommunityIcons name={iconName as iconNames} size={32} color="black" />
      </TouchableOpacity>
      <View className="">
        <Text className=" text-2xl font-medium">{title}</Text>
      </View>
    </View>
  );
}

export default CustomerHeader;
