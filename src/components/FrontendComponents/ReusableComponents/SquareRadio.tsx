import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface SquareRadioProps {
  title: string;
}
const SquareRadio = ({ title }: SquareRadioProps) => {
  const [clickSquareRadio, setClickSquareRadio] = useState(false);
  return (
    <View className="flex-row items-center space-x-4 mt-3">
      <TouchableOpacity className="ml-3" onPress={() => setClickSquareRadio(!clickSquareRadio)}>
        <View className=" h-5 w-5 border-primary border  ">
          {clickSquareRadio && <View className="bg-primary h-2 w-2 m-[5px] " />}
        </View>
      </TouchableOpacity>
      <Text className=" opacity-40 text-base">{title}</Text>
    </View>
  );
};

export default SquareRadio;
