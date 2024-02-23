/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HomeHeader from '../components/Header';
import axios from 'axios';
import {FlightType} from '../types/flightDataType';
import FlightCard from '../components/FlightCard';
import {COLORS} from '../constants/colors';
import Loader from '../components/Loader';
import {FilterType} from '../types/filterTypes';
import {Input} from '../components/Inputs';
import {width} from '../constants/dimensions';
import {Button} from '../components/Buttons';
import Entypo from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-date-picker';

const Home = () => {
  const [flights, setFlights] = useState<FlightType[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterType | undefined>();
  const [filterSet, setFilterSet] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [ascending, setAscending] = useState(true);

  useEffect(() => {
    const getFlightsData = async () => {
      setLoading(true);
      await axios
        .get('https://api.npoint.io/4829d4ab0e96bfab50e7')
        .then(
          (res: {
            data: {
              data: {
                result: FlightType[];
              };
            };
          }) => {
            const arr: FlightType[] = [];
            res.data.data.result &&
              res.data.data.result.map((item: FlightType) => {
                if (filters) {
                  if (
                    filters.from &&
                    item.displayData.source.airport.cityName
                      .toLowerCase()
                      .includes(filters.from.toLowerCase()) &&
                    filters.to &&
                    item.displayData.destination.airport.cityName
                      .toLowerCase()
                      .includes(filters.to.toLowerCase()) &&
                    filters.price &&
                    item.fare < filters.price
                  ) {
                    arr.push(item);
                  }
                }
              });
            setFlights(arr);
          },
        )
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    if (filterSet) {
      getFlightsData();
    }
  }, [filterSet, filters]);

  const validator = () => {
    let valid = true;
    if (!filters?.from || filters?.from === '') {
      valid = false;
    }
    if (!filters?.to || filters?.to === '') {
      valid = false;
    }
    if (!filters?.price || filters?.price === 0) {
      valid = false;
    }
    return valid;
  };

  const dataSortingByPrice = () => {
    let arr = [...flights];
    try {
      if (ascending) {
        const sortedArr = arr.sort((a, b) => a.fare - b.fare);
        setFlights(sortedArr);
      } else {
        const sortedArr = arr.sort((a, b) => b.fare - a.fare);
        setFlights(sortedArr);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (filterSet && flights.length > 0) {
      setLoading(true);
      dataSortingByPrice();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ascending]);

  return (
    <View style={styles.container}>
      <HomeHeader />
      {filterSet ? (
        loading ? (
          <View style={styles.loaderContainer}>
            <Loader />
          </View>
        ) : (
          <FlatList
            data={flights}
            renderItem={({item}) => {
              return <FlightCard item={item} />;
            }}
            ListEmptyComponent={
              <View style={styles.blockCenter}>
                <Text style={{textAlign: 'center', maxWidth: '70%'}}>
                  No flights available for the provided data! Kindly update the
                  filter.
                </Text>
              </View>
            }
            ListHeaderComponent={
              <>
                {filterSet && (
                  <View style={styles.headerFilter}>
                    <Entypo
                      name="aircraft"
                      size={100}
                      color={'#000'}
                      style={styles.headerIcon}
                    />
                    <View style={styles.row}>
                      <View>
                        <Text style={{...styles.normal}}>From:</Text>
                        <Text style={styles.bold}>{filters?.from}</Text>
                      </View>
                      <View>
                        <Text style={{...styles.normal, textAlign: 'right'}}>
                          To:
                        </Text>
                        <Text style={styles.bold}>{filters?.to}</Text>
                      </View>
                    </View>
                    <View style={styles.row}>
                      <View>
                        <Text style={{...styles.normal}}>Date:</Text>
                        <Text
                          style={{
                            ...styles.bold,
                            fontSize: 18,
                          }}>
                          {filters?.date?.toDateString()}
                        </Text>
                      </View>
                      <View>
                        <Text style={{...styles.normal, textAlign: 'right'}}>
                          Price:
                        </Text>
                        <Text
                          style={{
                            ...styles.bold,
                            fontSize: 18,
                          }}>
                          <Text style={{fontSize: 14, color: '#fff5'}}>
                            INR{' '}
                          </Text>
                          {filters?.price}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.row}>
                      <View>
                        <Text style={{...styles.normal}}>Sort by price</Text>
                        <TouchableOpacity
                          onPress={() => {
                            setAscending(prev => !prev);
                          }}>
                          <Text style={{...styles.bold, fontSize: 14}}>
                            {ascending ? 'Ascending' : 'Descending'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <Button
                        onPress={() => {
                          setFilterSet(false);
                        }}
                        style={{
                          backgroundColor: '#0005',
                          width: 140,
                        }}>
                        <Text>Change</Text>
                      </Button>
                    </View>
                  </View>
                )}
              </>
            }
          />
        )
      ) : (
        <ImageBackground
          blurRadius={4}
          style={{width, height: '100%'}}
          source={{
            uri: 'https://w0.peakpx.com/wallpaper/609/335/HD-wallpaper-artistic-plane-in-the-sky-clouds-flight-art-aeroplane-thumbnail.jpg',
            // uri: 'https://wallpapercosmos.com/w/full/3/5/2/1274861-2160x3840-samsung-4k-aircraft-wallpaper-photo.jpg',
          }}>
          <View style={styles.inputContainer}>
            <Text
              style={{...styles.bold, textAlign: 'center', marginBottom: 30}}>
              Book your journey with us and get exclusive offers!
            </Text>
            <Text style={styles.enterDetails}>
              Provide us the details of your travel and we will get you the best
              available flights
            </Text>
            <View style={styles.row}>
              <Input
                props={{
                  placeholder: 'Source',
                  value: filters?.from,
                  onChangeText(text) {
                    setFilters(prev => ({...prev, from: text}));
                  },
                }}
                width={width / 2 - 20}
              />
              <Input
                props={{
                  placeholder: 'Destination',
                  value: filters?.to,
                  onChangeText(text) {
                    setFilters(prev => ({...prev, to: text}));
                  },
                }}
                width={width / 2 - 20}
              />
            </View>
            <Input
              style={{marginTop: 10}}
              props={{
                placeholder: 'Enter date of travel',
                value: filters?.date?.toDateString(),
                onFocus() {
                  setDatePicker(true);
                },
              }}
            />
            <DatePicker
              modal
              mode="date"
              open={datePicker}
              date={filters?.date ?? new Date()}
              onConfirm={date => {
                setDatePicker(false);
                setFilters(prev => ({...prev, date}));
              }}
              onCancel={() => {
                setDatePicker(false);
              }}
            />
            <Input
              style={{marginTop: 10}}
              props={{
                placeholder: 'Expected price',
                value: filters?.price?.toString(),
                keyboardType: 'numeric',
                onChangeText(text) {
                  setFilters(prev => ({
                    ...prev,
                    price: text ? parseInt(text, 10) : 0,
                  }));
                },
              }}
            />
            <Button
              width={'100%'}
              style={{marginTop: 10}}
              onPress={() => {
                const isValid = validator();
                if (isValid) {
                  setFilterSet(true);
                } else {
                  Alert.alert('Please provide all the fields');
                }
              }}>
              Search flights
            </Button>
          </View>
        </ImageBackground>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.white,
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    width: width,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 10,
    justifyContent: 'space-between',
  },
  enterDetails: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fffd',
    // fontWeight: '600',
    maxWidth: width - 100,
    marginBottom: 20,
  },
  headerFilter: {
    gap: 10,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
  },
  headerIcon: {
    position: 'absolute',
    opacity: 0.5,
    top: 10,
  },
  bold: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 24,
    lineHeight: 24,
  },
  blockCenter: {
    width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  normal: {
    fontSize: 14,
    color: '#fff8',
  },
});
