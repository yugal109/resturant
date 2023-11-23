import SegmentedControl from '@react-native-segmented-control/segmented-control';
import clsx from 'clsx';
import * as React from 'react';
import { View } from 'react-native';
import { iOSColors } from 'react-native-typography';

import { Text } from '../';

export const OptionSwitch = ({
  title,
  selectedIndex,
  values,
  onIndexChange,
  textStyle,
}: {
  title: string;
  selectedIndex: number;
  values: string[];
  textStyle?: string;
  onIndexChange: (idx: number) => void;
}) => {
  return (
    <View className=" pt-2 px-4">
      <Text className={clsx('ml-1 text-base', textStyle)} weight="semibold">
        {title}
      </Text>
      <SegmentedControl
        values={values}
        selectedIndex={selectedIndex}
        onChange={(event) => {
          onIndexChange(event.nativeEvent.selectedSegmentIndex);
        }}
        backgroundColor={iOSColors.lightGray2}
      />
    </View>
  );
};
