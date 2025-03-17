import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import StockItem from './StockItem';
import { StockData, stockData } from './StockData';

const StockList = () => {
  const renderStockItem = ({ item }: { item: StockData }) => (
      <StockItem stock={item} />
  );

  return (
      <SafeAreaView style={styles.container}>
        <StatusBar
            backgroundColor="#FFFFFF"
            barStyle="dark-content"
        />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>股票列表</Text>
        </View>
        <View style={styles.content}>
          <FlatList
              data={stockData}
              renderItem={renderStockItem}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    backgroundColor: '#1E1E1E',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingTop: 12,
    paddingHorizontal: 8,
  },
  separator: {
    height: 0,
  },
});

export default StockList;
