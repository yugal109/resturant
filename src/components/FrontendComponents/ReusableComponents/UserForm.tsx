import { Text, TextInput, View } from 'react-native';

import { Customer } from '../../../api/Frontend/apiTypes/profileApiTypes';

interface UserFormProps {
  title: string;
  moreClassName?: string;
}

function UserForm({
  title,

  moreClassName,
}: UserFormProps) {
  return (
    <View className="mt-2">
      <Text className=" text-secondary text-lg">{title}</Text>
      <TextInput
        className={`bg-userFormGrey rounded-3xl mt-3 ${moreClassName ? moreClassName : 'p-5'}`}
        value=""
      />
    </View>
  );
}

export default UserForm;
