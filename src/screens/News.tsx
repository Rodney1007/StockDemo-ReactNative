import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Linking,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../components/Header';
import NewsItem from '../components/NewsItem';
import watchListService from '../services/WatchListService';
import newsService, { NewsItem as NewsItemType } from '../services/NewsService';
import Colors from '../constants/Colors';

const News = () => {
  const [news, setNews] = useState<NewsItemType[]>([]);
  const [loading, setLoading] = useState(false);

  const loadNews = useCallback(async () => {
    try {
      setLoading(true);
      const watchlist = await watchListService.getWatchList();
      const allNews: NewsItemType[] = [];
      // 為每個自選股票抓取新聞
      for (const stock of watchlist) {
        const stockNews = await newsService.fetchStockNews(stock.name);
        allNews.push(...stockNews);
      }

      // 按日期排序
      const sortedNews = allNews.sort((a, b) => {
        return (
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
        );
      });

      // 移除重複的新聞（根據標題）
      const uniqueNews = sortedNews.filter((newsItem, index, self) =>
        index === self.findIndex((t) => t.title === newsItem.title)
      );

      setNews(uniqueNews);
    } catch (error) {
      console.error('載入新聞時發生錯誤:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadNews().finally();
    }, [loadNews])
  );

  const handleNewsPress = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('開啟連結時發生錯誤:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="相關新聞" />
      <FlatList
        data={news}
        renderItem={({ item }) => (
          <NewsItem item={item} onPress={handleNewsPress} />
        )}
        keyExtractor={(item, index) => `${item.link}-${index}`}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={loadNews}
            tintColor={Colors.text.primary}
          />
        }
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {loading ? '載入中...' : '目前沒有相關新聞'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 32,
  },
  emptyText: {
    color: Colors.text.tertiary,
    fontSize: 16,
  },
});

export default News;
