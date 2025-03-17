import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../components/Header';
import StockItem from '../stocklist/StockItem';
import watchListService from '../../services/WatchListService';
import { StockData } from '../stocklist/StockData';

const WatchList = () => {
  const [watchlist, setWatchlist] = useState<StockData[]>([]);

  const loadWatchList = useCallback(async () => {
    const data = await watchListService.getWatchList();
    setWatchlist(data);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadWatchList();
    }, [loadWatchList])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="自選清單" />
      <View style={styles.content}>
        <FlatList
          data={watchlist}
          renderItem={({ item }) => (
            <StockItem
              stock={item}
              onAddToWatchList={loadWatchList}
            />
          )}
          keyExtractor={item => item.id}
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
  content: {
    flex: 1,
  },
});

export default WatchList; 