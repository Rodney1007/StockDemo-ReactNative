import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const News = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>新聞</Text>
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

export default News; 