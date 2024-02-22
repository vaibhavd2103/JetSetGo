import {ActivityIndicator, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/colors';

const Loader = () => {
  return (
    <View>
      <ActivityIndicator size={'large'} color={COLORS.secondary} />
    </View>
  );
};

export default Loader;
