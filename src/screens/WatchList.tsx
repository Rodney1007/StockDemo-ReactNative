import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../components/Header';
import StockItem from '../components/StockItem';
import RemoveFromWatchListDialog from '../components/RemoveFromWatchListDialog';
import watchListService from '../services/WatchListService';
import { StockData } from '../components/StockData';

const WatchList = () => {
  const [watchlist, setWatchlist] = useState<StockData[]>([]);
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const loadWatchList = useCallback(async () => {
    const data = await watchListService.getWatchList();
    setWatchlist(data);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadWatchList().finally();
    }, [loadWatchList])
  );

  const handleStockPress = useCallback((symbol: string) => {
    const stock = watchlist.find(s => s.symbol === symbol);
    if (stock) {
      setSelectedStock(stock);
      setShowDialog(true);
    }
  }, [watchlist]);

  const handleDialogClose = useCallback(() => {
    setShowDialog(false);
    setSelectedStock(null);
  }, []);

  const handleRemoveSuccess = useCallback(async () => {
    await loadWatchList();
    handleDialogClose();
  }, [loadWatchList, handleDialogClose]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="自選清單" />
      <View style={styles.content}>
        <FlatList
          data={watchlist}
          renderItem={({ item }) => (
            <StockItem
              stock={item}
              onPress={handleStockPress}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>

      {selectedStock && (
        <RemoveFromWatchListDialog
          visible={showDialog}
          stock={selectedStock}
          onSuccess={handleRemoveSuccess}
          onClose={handleDialogClose}
        />
      )}
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
    paddingTop: 16,
  },
});

export default WatchList;
