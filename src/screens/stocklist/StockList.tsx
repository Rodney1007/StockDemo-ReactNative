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
import LinearGradient from 'react-native-linear-gradient';
import StockItem from './StockItem';
import { StockData, stockData } from './StockData';

const StockList = () => {

  const renderStockItem = ({ item }: { item: StockData }) => (
    <StockItem stock={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#2A2A2A', '#1E1E1E']}
        style={styles.headerGradient}
      >
        <StatusBar
          backgroundColor="transparent"
          translucent
          barStyle="light-content"
        />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>股票列表</Text>
        </View>
        <View style={styles.headerGlow} />
      </LinearGradient>
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
    backgroundColor: '#0A0A0A',
  },
  headerGradient: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  headerGlow: {
    height: 1,
    backgroundColor: '#333333',
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 24,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
