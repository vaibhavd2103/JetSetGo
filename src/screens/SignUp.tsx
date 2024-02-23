import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/colors';
import {Input} from '../components/Inputs';
import {Button} from '../components/Buttons';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../constants/routes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const SignUp = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <KeyboardAvoidingView style={styles.outer}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentStyle}>
        <Text style={styles.title}>Welcome to JetSetGo!</Text>
        <Text style={styles.subTitle}>Please sign up to continue</Text>
        <Input
          width={'100%'}
          props={{
            placeholder: 'Enter email',
          }}
        />
        <Input
          width={'100%'}
          props={{
            placeholder: 'Enter password',
          }}
        />
        <Input
          width={'100%'}
          props={{
            placeholder: 'Confirm password',
          }}
        />
        <Button width={'100%'}>Login</Button>
        <View style={styles.row}>
          <Text>Already have an account?</Text>
          <TouchableOpacity
            style={styles.signUp}
            onPress={() => {
              console.log('gg');
              navigation.navigate(SCREENS.LOGIN);
            }}>
            <Text style={styles.signUpText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  outer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
  },
  contentStyle: {
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signUp: {
    marginLeft: 10,
  },
  signUpText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  subTitle: {
    fontSize: 16,
    color: COLORS.secondary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
