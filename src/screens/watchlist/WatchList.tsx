import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WatchList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>自選清單</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 20,
  },
});

export default WatchList; 