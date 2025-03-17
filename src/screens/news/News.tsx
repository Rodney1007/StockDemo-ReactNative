import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header';

const News = () => {
  return (
    <View style={styles.container}>
      <Header title="新聞" />
      <Text style={styles.text}>新聞</Text>
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

export default News; 