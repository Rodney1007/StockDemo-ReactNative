import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header';

const WatchList = () => {
  return (
    <View style={styles.container}>
      <Header title="自選清單" />
      <Text style={styles.text}>自選清單</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default WatchList; 