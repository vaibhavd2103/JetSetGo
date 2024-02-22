/* eslint-disable react-native/no-inline-styles */
import {FlatList, StyleSheet, Text, View} from 'react-native';
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
                      .includes(filters.from.toLowerCase())
                  ) {
                    console.log(
                      item.displayData.source.airport.cityName.toLowerCase() ===
                        filters.from.toLowerCase(),
                    );
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
            // eslint-disable-next-line react/no-unstable-nested-components
            ListHeaderComponent={() => {
              return (
                <>
                  {filterSet && (
                    <View style={styles.headerFilter}>
                      <Entypo
                        name="aircraft"
                        size={100}
                        color={'#000'}
                        style={styles.headerIcon}
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          width: '100%',
                        }}>
                        <View>
                          <Text style={{color: '#fff'}}>From:</Text>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: '#fff',
                              fontSize: 24,
                              lineHeight: 24,
                            }}>
                            {filters?.from}
                          </Text>
                        </View>
                        <View>
                          <Text style={{color: '#fff', textAlign: 'right'}}>
                            To:
                          </Text>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: '#fff',
                              fontSize: 24,
                              lineHeight: 24,
                            }}>
                            {filters?.to}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          width: '100%',
                        }}>
                        <View>
                          <Text style={{color: '#fff'}}>Date:</Text>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: '#fff',
                              fontSize: 18,
                              lineHeight: 18,
                            }}>
                            {filters?.date?.toDateString()}
                          </Text>
                        </View>
                        <View>
                          <Text style={{color: '#fff', textAlign: 'right'}}>
                            Price:
                          </Text>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: '#fff',
                              fontSize: 18,
                              lineHeight: 18,
                            }}>
                            {filters?.price}
                          </Text>
                        </View>
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
                  )}
                </>
              );
            }}
            data={flights}
            renderItem={({item}) => {
              return <FlightCard item={item} />;
            }}
          />
        )
      ) : (
        <View style={styles.inputContainer}>
          <Text style={styles.enterDetails}>
            Enter the details of your travel and we will get you the best
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
                setFilters(prev => ({...prev, price: parseInt(text, 10)}));
              },
            }}
          />
          <Button
            width={'100%'}
            style={{marginTop: 10}}
            onPress={() => {
              setFilterSet(true);
            }}>
            Search flights
          </Button>
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    width: width,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: width,
    gap: 10,
  },
  enterDetails: {
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.dark,
    fontWeight: '600',
    maxWidth: width - 100,
    marginBottom: 20,
  },
  headerFilter: {
    gap: 10,
    backgroundColor: COLORS.secondary,
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
});
