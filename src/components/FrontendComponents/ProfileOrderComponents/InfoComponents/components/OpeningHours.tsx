import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text } from 'react-native';

const OpeningHours = () => {
  return (
    <View style={{ marginTop: 60 }}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name="time" size={24} color="black" />
        <Text style={{ fontSize: 20 }}>Opening Hours</Text>
      </View>
      <View style={{ marginTop: 35 }}>
        <Text style={{ fontSize: 17 }}>
          Lorem ipsum dolor sit amet, sectetur adipiscing elit,.Dui ut ornare lectus sit amet.
          Varius sit amet mattis vulputate enim nulla. Read more
        </Text>
      </View>
    </View>
  );
};

export default OpeningHours;
