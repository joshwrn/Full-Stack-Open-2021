import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#000000',
    paddingBottom: Constants.statusBarHeight - 25,
  },
  scroll: {
    display: 'flex',
    flexDirection: 'row',
  },
  inner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-evenly' }}
        horizontal
      >
        <Link to="/">
          <Text fontSize="subheading" fontWeight="bold" color="label">
            Repositories
          </Text>
        </Link>
        <Link to="/signin">
          <Text fontSize="subheading" fontWeight="bold" color="label">
            Sign In
          </Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
