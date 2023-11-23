import { Ionicons, MaterialCommunityIcons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const CustomDrawerContent = ({ navigation }: any) => {
  const [showlanguages, setshowlanguages] = useState<boolean>(false);
  const [activeLanguage, setActiveLanguage] = useState<boolean>(true);

  return (
    <View className="flex-1 ml-5 mt-12">
      <View className="flex-row gap-1 relative">
        <View className="h-20 w-2 bg-secondary opacity-40 top-60 absolute right-2 rounded-lg" />
        <Image
          source={require('../../../../assets/Profile.png')}
          className=" w-20 h-20 mr-3 rounded-full"
        />
        <Text className="text-secondary text-2xl font-medium">Hi Roshan!</Text>
      </View>
      <DrawerContentScrollView>
        <DrawerItem
          labelStyle={{ color: 'black', fontSize: 17, marginLeft: -20 }}
          label="Profile"
          onPress={() => navigation.navigate('ProfilePage')}
          icon={() => <Ionicons name="person-circle-outline" size={24} color="black" />}
        />

        <DrawerItem
          labelStyle={{ color: 'black', fontSize: 17, marginLeft: -25 }}
          icon={() => <MaterialCommunityIcons name="cart-arrow-down" size={24} color="black" />}
          label="Orders"
          onPress={() => {
            navigation.navigate('OrdersList');
          }}
        />

        <DrawerItem
          labelStyle={{ color: 'black', fontSize: 17, marginLeft: -25 }}
          icon={() => <AntDesign name="home" size={24} color="black" />}
          label="My address Book"
          onPress={() => {}}
        />

        <DrawerItem
          labelStyle={{ color: 'black', fontSize: 17, marginLeft: -25 }}
          icon={() => <MaterialIcons name="sticky-note-2" size={24} color="black" />}
          label="Privacy and Policy"
          onPress={() => {}}
        />

        <DrawerItem
          labelStyle={{ color: 'black', fontSize: 17, marginLeft: -25, position: 'relative' }}
          icon={() => (
            <>
              <Image source={require('../../../../assets/belgium.png')} />
              <AntDesign
                name="down"
                size={24}
                color="black"
                style={{ position: 'absolute', right: 80 }}
              />
            </>
          )}
          label="Language"
          onPress={() => {
            setshowlanguages(!showlanguages);
          }}
        />
        {showlanguages && (
          <View className=" w-40 bg-white rounded-3xl ml-3 mb-4">
            <View className=" w-full p-4  ">
              <TouchableOpacity className="flex-row space-x-4 p-2">
                <Image source={require('../../../../assets/belgium.png')} />
                <Text className="font-bold text-base">Dutch</Text>
              </TouchableOpacity>
              <View className="flex-row space-x-4 p-2">
                <Image source={require('../../../../assets/belgium.png')} />
                <Text className="font-bold text-base">French</Text>
              </View>
              <View
                className={`flex-row space-x-4 p-2 ${
                  activeLanguage ? 'bg-primary/30 rounded-xl' : ''
                }`}>
                <Image source={require('../../../../assets/belgium.png')} />
                <Text className="font-bold text-base ">English</Text>
              </View>
            </View>
          </View>
        )}
      </DrawerContentScrollView>
    </View>
  );
};
export default CustomDrawerContent;
