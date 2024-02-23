import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/colors';

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Welcome to JetSetGo</Text>
        <Text style={styles.description}>Book your flights on the go!</Text>
      </View>
      <Image
        style={styles.avatar}
        source={{
          uri: 'https://media.istockphoto.com/id/1410538853/photo/young-man-in-the-public-park.webp?b=1&s=170667a&w=0&k=20&c=pGdjFVdK-_BhTa6PMy5VNcXdbxVNngzg-OPzMfJKrG8=',
        }}
      />
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    elevation: 10,
    backgroundColor: COLORS.secondary,
    // borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 20,
    color: COLORS.dark,
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
