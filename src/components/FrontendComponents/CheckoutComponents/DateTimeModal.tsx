import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, Text, View, Modal } from 'react-native';

interface DateTimeModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DateTimeModal({ showModal, setShowModal }: DateTimeModalProps) {
  return (
    <Modal transparent visible={showModal}>
      <View className="flex-1 mb-20 items-center justify-center  ">
        <View className="bg-white items-center w-80 ">
          <View className="mt-5 bg-primary/20 rounded-full items-center h-14 justify-center w-72  ">
            <Text className=" text-2xl font-medium ">ASAP</Text>
          </View>
          <View className="m-3">
            <View className="p-2">
              <Text className="text-center text-2xl font-medium">Plan your order</Text>
              <View className="flex-row mt-2 space-x-2  justify-around  w-full">
                {/* Date */}
                <DateTimeButton title="Tue. 08" />
                {/* Time */}
                <DateTimeButton title="17:00" />
              </View>
            </View>
          </View>

          <View className="items-center mb-3">
            <TouchableOpacity
              className=" bg-primary rounded-full h-14 w-72 flex-row items-center justify-between "
              onPress={() => setShowModal(!showModal)}>
              <View className="flex-1">
                <Text className="text-secondary text-lg text-center">Update</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

interface DateTimeButtonProps {
  title: string;
}

function DateTimeButton({ title }: DateTimeButtonProps) {
  return (
    <TouchableOpacity className="bg-dateTime p-2 rounded-full w-32 ">
      <View className="flex-row items-center justify-around">
        <Text className="text-center text-lg font-medium flex-1">{title}</Text>
        <MaterialCommunityIcons name="chevron-down" color="white" size={32} />
      </View>
    </TouchableOpacity>
  );
}
