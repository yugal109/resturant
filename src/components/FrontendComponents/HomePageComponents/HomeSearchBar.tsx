import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInput, View, Keyboard, Button } from 'react-native';

const HomeSearchBar = () => {
  const [clicked, setClicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');

  return (
    <View className="m-4 justify-start items-center flex-row ">
      <View
        className={`p-4 flex-row  items-center rounded-full bg-grey/10 ${
          clicked ? ' w-5/6 justify-evenly' : ' w-11/12 '
        }`}>
        {/* search Icon */}
        <Feather name="search" size={20} color="black" style={{ marginLeft: 1 }} />
        {/* Input field */}
        <TextInput
          className="text-xl pb-2 pl-4 w-full"
          placeholder="Search"
          placeholderTextColor="gray"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
      </View>
      {/* cancel button, depending on whether the search bar is clicked or not */}
      {clicked && (
        <View>
          <Button
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
            }}
            color="green"
          />
        </View>
      )}
    </View>
  );
};

export default HomeSearchBar;
