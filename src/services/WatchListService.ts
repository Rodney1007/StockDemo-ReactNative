import AsyncStorage from '@react-native-async-storage/async-storage';
import { StockData } from '../screens/stocklist/StockData';

const WATCHLIST_KEY = '@watchlist';

class WatchListService {
  public async getWatchList(): Promise<StockData[]> {
    try {
      const data = await AsyncStorage.getItem(WATCHLIST_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting watchlist:', error);
      return [];
    }
  }

  public async addToWatchList(stock: StockData): Promise<boolean> {
    try {
      const watchlist = await this.getWatchList();
      if (!watchlist.some(item => item.symbol === stock.symbol)) {
        watchlist.push(stock);
        await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      return false;
    }
  }

  public async removeFromWatchList(symbol: string): Promise<boolean> {
    try {
      const watchlist = await this.getWatchList();
      const filtered = watchlist.filter(item => item.symbol !== symbol);
      await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      return false;
    }
  }
}

export default new WatchListService(); 