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

const Login = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <KeyboardAvoidingView style={styles.outer}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentStyle}>
        <Text style={styles.title}>Login</Text>
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
        <Button
          onPress={() => {
            navigation.navigate(SCREENS.HOME);
          }}
          width={'100%'}>
          Login
        </Button>
        <View style={styles.row}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity
            style={styles.signUp}
            onPress={() => {
              navigation.navigate(SCREENS.SIGNUP);
            }}>
            <Text style={styles.signUpText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

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
});
