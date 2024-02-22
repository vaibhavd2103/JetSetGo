import {
  DimensionValue,
  // StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  // ViewStyle,
} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/colors';

export const Button = ({
  children,
  height,
  width,
  onPress,
  style,
}: {
  children: React.JSX.Element | string;
  height?: DimensionValue;
  width?: DimensionValue;
  onPress?: Function;
  style?: any;
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress ? onPress() : null;
      }}
      activeOpacity={0.7}
      style={{
        ...styles.button,
        height: height ?? 40,
        width: width ?? 'auto',
        ...style,
      }}>
      <Text style={styles.title}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});
