import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface CircleRadioProps {
  title: string;
}

const CircleRadio = ({ title }: CircleRadioProps) => {
  const [clickCircleRadio, setClickCircleRadio] = useState(false);
  return (
    <View className="flex-row items-center space-x-4 mt-3">
      <TouchableOpacity className="ml-3" onPress={() => setClickCircleRadio(!clickCircleRadio)}>
        <View className="h-5 w-5 border-primary border rounded-full ">
          {clickCircleRadio && <View className="bg-primary h-2 w-2 m-[5px] rounded-full" />}
        </View>
      </TouchableOpacity>
      <Text className="text-secondary text-base">{title}</Text>
    </View>
  );
};

export default CircleRadio;
