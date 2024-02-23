/* eslint-disable react-native/no-inline-styles */
import {Alert, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {width} from '../constants/dimensions';
import DetailsHeader from '../components/DetailsHeader';
import {FlightType} from '../types/flightDataType';
import {COLORS} from '../constants/colors';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
import {Button} from '../components/Buttons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const FlightDetails = ({route}: any) => {
  const item: FlightType = route.params.data;
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
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
          <Text style={styles.lightNormal}>Date :</Text>
          <Text style={{...styles.bold, fontSize: 16}}>
            {moment(item.displayData.source.depTime).format('Do MMM YY')}
          </Text>
          <View style={{...styles.row, marginTop: 20}}>
            <View style={{width: '50%'}}>
              <Text style={{...styles.bold}}>
                {item.displayData.source.airport.cityCode}
              </Text>
              <Text style={styles.lightNormal}>
                {item.displayData.source.airport.cityName}
              </Text>
              <Text style={{...styles.normal}}>
                {item.displayData.source.airport.airportName}
              </Text>
              <Entypo
                name="aircraft-take-off"
                size={36}
                color={COLORS.secondary}
              />
              <Text style={styles.lightNormal}>Depart :</Text>
              <Text style={{...styles.normal}}>
                {moment(item.displayData.source.depTime).format('hh:mm')} AM
              </Text>
            </View>
            <View style={{alignItems: 'flex-end', width: '50%'}}>
              <Text style={{...styles.bold}}>
                {item.displayData.destination.airport.cityCode}
              </Text>
              <Text style={{...styles.lightNormal, textAlign: 'right'}}>
                {item.displayData.destination.airport.cityName}
              </Text>
              <Text style={{...styles.normal, textAlign: 'right'}}>
                {item.displayData.destination.airport.airportName}
              </Text>
              <Entypo
                name="aircraft-landing"
                size={36}
                color={COLORS.secondary}
              />
              <Text style={styles.lightNormal}>Arrival :</Text>
              <Text style={styles.normal}>
                {moment(item.displayData.destination.arrTime).format('hh:mm')}{' '}
                AM
              </Text>
            </View>
          </View>
          <View style={{...styles.row, marginTop: 20}}>
            <View>
              <Text style={styles.lightNormal}>Stop info :</Text>
              <Text style={{...styles.bold, fontSize: 16}}>
                {item.displayData.stopInfo}
              </Text>
            </View>
            <View>
              <Text style={styles.lightNormal}>Travel time :</Text>
              <Text style={{...styles.bold, fontSize: 16, textAlign: 'right'}}>
                {item.displayData.totalDuration}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.backdrop}>
          <Text style={styles.terms}>
            Things to acknowledge before booking ticket
          </Text>
          <Text style={{color: '#000', textAlign: 'center'}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
        </View>
        <View
          style={{
            padding: 16,
            position: 'absolute',
            bottom: 50,
            width: '100%',
          }}>
          <Button
            onPress={() => {
              Alert.alert('Ticket booked successfully!');
              navigation.goBack();
            }}>
            Confirm ticket
          </Button>
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
  backdrop: {
    padding: 16,
    width: width - 32,
    backgroundColor: '#fffa',
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center',
  },
  lightNormal: {fontSize: 14, color: '#fff8'},
  terms: {
    fontWeight: 'bold',
    color: COLORS.dark,
    textAlign: 'center',
    fontSize: 18,
    maxWidth: '80%',
  },
});
