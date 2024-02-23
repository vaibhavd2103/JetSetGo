/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FlightType} from '../types/flightDataType';
import {COLORS} from '../constants/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import {width} from '../constants/dimensions';
import {Button} from './Buttons';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../constants/routes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const FlightCard = ({item}: {item: FlightType}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <View key={item.id} style={styles.container}>
      <View style={styles.row}>
        <View>
          <Text style={{...styles.bold, color: COLORS.dark}}>
            {item.displayData.source.airport.cityCode}
          </Text>
          <Text style={{...styles.normal, color: COLORS.secondary}}>
            {item.displayData.source.airport.cityName}
          </Text>
          <Entypo name="aircraft-take-off" size={30} color={COLORS.primary} />
          <Text style={{...styles.bold, fontSize: 12}}>Depart :</Text>
          <Text style={{...styles.normal}}>
            {moment(item.displayData.source.depTime).format('Do MMM')}
          </Text>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              ...styles.normal,
              color: COLORS.primary,
              fontWeight: 'bold',
            }}>
            {item.displayData.airlines[0].airlineName}
          </Text>
          <Text style={{...styles.normal, fontStyle: 'italic', fontSize: 12}}>
            ({item.displayData.airlines[0].flightNumber})
          </Text>
          {/* <Entypo name="aircraft" size={30} color={COLORS.primary} /> */}
          <Text
            style={{
              ...styles.bold,
              color: COLORS.secondary,
              fontSize: 18,
            }}>
            {item.displayData.totalDuration}
          </Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={{...styles.bold, color: COLORS.dark}}>
            {item.displayData.destination.airport.cityCode}
          </Text>
          <Text style={{...styles.normal, color: COLORS.secondary}}>
            {item.displayData.destination.airport.cityName}
          </Text>
          <Entypo name="aircraft-landing" size={30} color={COLORS.primary} />
          <Text style={{...styles.bold, fontSize: 12}}>Arrival :</Text>
          <Text style={styles.normal}>
            {moment(item.displayData.destination.arrTime).format('Do MMM')}
          </Text>
        </View>
      </View>
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#ddd',
          marginVertical: 10,
        }}
      />
      <View style={{...styles.row}}>
        <View>
          <Text style={{...styles.normal, fontSize: 14}}>Price :</Text>
          <Text style={{...styles.bold, fontStyle: 'italic', lineHeight: 20}}>
            <Text style={{color: '#0008', fontSize: 14}}>INR </Text>
            {item.fare}
          </Text>
        </View>
        <View>
          <Button
            style={{paddingHorizontal: 10, paddingVertical: 0}}
            height={24}
            onPress={() => {
              navigation.navigate(SCREENS.FLIGHT_DETAILS, {
                data: item,
              });
            }}>
            <Text style={{fontSize: 12}}>
              View Details{' '}
              <FontAwesome6 name="angle-right" size={10} color={'#fff'} />
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default FlightCard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    elevation: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    width: width - 32,
    alignSelf: 'center',
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
  normal: {
    fontSize: 14,
    color: '#000',
  },
});
