import {
  // Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const DetailsHeader = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.goBack();
        }}>
        <Ionicons name="chevron-back" size={20} color={'#fff'} />
      </TouchableOpacity>
      <Text style={styles.title}>Ticket details</Text>
    </View>
  );
};

export default DetailsHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 16,
    paddingVertical: 8,
    // backgroundColor: COLORS.primary,
    // borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    gap: 5,
  },
  title: {
    fontSize: 20,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: COLORS.light,
    fontWeight: 'bold',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 40,
  },
});
