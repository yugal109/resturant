import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import ReviewBottomReplies from './components/ReviewBottomReplies';
import ReviewBottomWriteComments from './components/ReviewBottomWriteComments';

function ReviewComment() {
  return (
    <View>
      <ScrollView className=" bg-screenBackground">
        {/* <ScrollView className=" 
      mb-36
      "> */}
        <ReviewBottomReplies />
        <ReviewBottomReplies />
        <ReviewBottomReplies />
      </ScrollView>
      {/* <View className="absolute bottom-0 bg-white border-t border-t-grey/25 ml-3 ">
        <ReviewBottomWriteComments />
      </View> */}
    </View>
  );
}

export default ReviewComment;
