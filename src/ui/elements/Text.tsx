import React, { ComponentProps } from 'react';
import { Text as NativeText, TextStyle } from 'react-native';
import { sanFranciscoWeights, Style } from 'react-native-typography';

type TextProps = {
  weight?: keyof typeof sanFranciscoWeights;
  style?: TextStyle | Style;
  children?: ComponentProps<typeof NativeText>['children'];
  className?: any;
};
export const Text = ({ weight, style, children, className }: TextProps) => {
  const fontFamily = 'Poppins';
  let fontFamilyVarient = 'Regular';
  switch (weight) {
    case 'black':
      fontFamilyVarient = 'Black';
      break;
    case 'bold':
      fontFamilyVarient = 'Bold';
      break;
    case 'heavy':
      fontFamilyVarient = 'ExtraBold';
      break;
    case 'light':
      fontFamilyVarient = 'Light';
      break;
    case 'medium':
      fontFamilyVarient = 'SemiBold';
      break;
    case 'regular':
      fontFamilyVarient = 'Regular';
      break;
    case 'semibold':
      fontFamilyVarient = 'SemiBold';
      break;
    case 'thin':
      fontFamilyVarient = 'Thin';
      break;
    case 'ultraLight':
      fontFamilyVarient = 'ExtraLight';
      break;
    default:
      break;
  }

  return (
    <NativeText
      className={className}
      style={[
        sanFranciscoWeights[weight || 'regular'],
        { fontFamily: `${fontFamily}-${fontFamilyVarient}` },
        style,
      ]}
      children={children}
    />
  );
};
