import { Text, TextInput, View } from 'react-native';

import { Customer } from '../../../api/Frontend/apiTypes/profileApiTypes';

interface UserFormProps {
  title: string;
  value: string;
  changeProfileInfo: () => void;
  moreClassName?: string;
}

function UserProfileForm({ title, value, changeProfileInfo, moreClassName }: UserFormProps) {
  return (
    <View className="mt-2">
      <Text className=" text-secondary text-lg">{title}</Text>
      <TextInput
        className={`bg-userFormGrey rounded-3xl mt-3 ${moreClassName ? moreClassName : 'p-5'}`}
        value={value}
        // onChangeText={setInitialProfileInfo({ ...initialProfileInfo, [profileInfoVariable]: e })}
      />
    </View>
  );
}

export default UserProfileForm;
