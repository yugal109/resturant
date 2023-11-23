import { useState } from 'react';
import { View, Image, TextInput, Text, TouchableOpacity } from 'react-native';

function ReviewBottomWriteComments() {
  const [clickRadio, setClickRadio] = useState(false);
  return (
    <View className="mt-3">
      <View className="flex-row items-center justify-evenly ">
        <Image
          source={require('../../../../../../../../assets/Profile.png')}
          className=" w-14 h-14 mr-3 rounded-full"
        />
        <View className="p-4 flex-row bg-grey/10 rounded-full items-center w-3/4">
          {/* Input field */}
          <TextInput
            className="text-xl pb-1 pl-4"
            placeholder="Write a comment..."
            placeholderTextColor="grey"
          />
        </View>
      </View>

      <View className="flex-row items-center ml-4 justify-between mt-4">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity className="ml-3" onPress={() => setClickRadio(!clickRadio)}>
            <View className=" h-5 w-5 border-primary border">
              {clickRadio && <View className="bg-primary h-2 w-2 m-[5px]" />}
            </View>
          </TouchableOpacity>
          <Text className=" opacity-40 text-base">Comment Anonymously</Text>
        </View>
        <TouchableOpacity className="bg-primary p-3 rounded-xl">
          <Text className="text-white">Comment</Text>
        </TouchableOpacity>
      </View>
      <Text />
    </View>
  );
}

export default ReviewBottomWriteComments;
