import {
  DimensionValue,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/colors';

export const Input = ({
  leftIcon,
  rightIcon,
  props,
  width,
  style,
}: {
  leftIcon?: React.JSX.Element;
  rightIcon?: React.JSX.Element;
  props?: TextInputProps;
  width?: DimensionValue;
  style?: any;
}) => {
  return (
    <View style={{...styles.inputContainer, width: width ?? 'auto', ...style}}>
      {leftIcon}
      <TextInput style={styles.input} {...props} />
      {rightIcon}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.light,
    borderRadius: 10,
    // width: '100%',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    // flex: 1,
    height: 40,
  },
  input: {
    flex: 1,
    color: '#000',
  },
});
