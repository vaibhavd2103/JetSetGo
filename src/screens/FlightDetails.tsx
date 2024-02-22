/* eslint-disable react-native/no-inline-styles */
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {width} from '../constants/dimensions';
import DetailsHeader from '../components/DetailsHeader';
import {FlightType} from '../types/flightDataType';
import {COLORS} from '../constants/colors';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';

const FlightDetails = ({route}: any) => {
  const item: FlightType = route.params.data;
  console.log(item);
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imgBackground}
        source={{
          //   uri: 'https://w0.peakpx.com/wallpaper/609/335/HD-wallpaper-artistic-plane-in-the-sky-clouds-flight-art-aeroplane-thumbnail.jpg',
          uri: 'https://wallpapercosmos.com/w/full/3/5/2/1274861-2160x3840-samsung-4k-aircraft-wallpaper-photo.jpg',
        }}>
        <View style={styles.detailsContainer}>
          <DetailsHeader />
          <View style={styles.row}>
            <View>
              <Text style={{...styles.bold}}>
                {item.displayData.source.airport.cityCode}
              </Text>
              <Text style={{...styles.normal, color: COLORS.secondary}}>
                {item.displayData.source.airport.cityName}
              </Text>
              <Entypo
                name="aircraft-take-off"
                size={30}
                color={COLORS.primary}
              />
              <Text style={{...styles.bold, fontSize: 12}}>Depart :</Text>
              <Text style={{...styles.normal}}>
                {moment(item.displayData.source.depTime).format('Do MMM')}
              </Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text style={{...styles.bold}}>
                {item.displayData.destination.airport.cityCode}
              </Text>
              <Text style={{...styles.normal, color: COLORS.secondary}}>
                {item.displayData.destination.airport.cityName}
              </Text>
              <Entypo
                name="aircraft-landing"
                size={30}
                color={COLORS.primary}
              />
              <Text style={{...styles.bold, fontSize: 12}}>Arrival :</Text>
              <Text style={styles.normal}>
                {moment(item.displayData.destination.arrTime).format('Do MMM')}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default FlightDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgBackground: {
    width: width,
    height: '100%',
  },
  detailsContainer: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#fff',
  },
  normal: {
    fontSize: 14,
    color: '#fff',
  },
});
