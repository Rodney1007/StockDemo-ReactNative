import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../components/Header';
import watchListService from '../services/WatchListService';
import newsService, { NewsItem } from '../services/NewsService';

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);

  const loadNews = useCallback(async () => {
    try {
      setLoading(true);
      const watchlist = await watchListService.getWatchList();
      const allNews: NewsItem[] = [];
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

  const renderNewsItem = ({ item }: { item: NewsItem }) => (
    <TouchableOpacity
      style={styles.newsItem}
      onPress={() => handleNewsPress(item.link)}
    >
      <Text style={styles.newsDate}>{item.publishDate}</Text>
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Text style={styles.newsSource}>{item.source}</Text>
      <Text style={styles.newsSnippet} numberOfLines={2}>
        {item.snippet}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="相關新聞" />
      <FlatList
        data={news}
        renderItem={renderNewsItem}
        keyExtractor={(item, index) => `${item.link}-${index}`}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={loadNews}
            tintColor="#FFFFFF"
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
    backgroundColor: '#0A0A0A',
  },
  listContent: {
    padding: 16,
  },
  newsItem: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  newsDate: {
    color: '#888888',
    fontSize: 12,
    marginBottom: 4,
  },
  newsTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  newsSource: {
    color: '#4CAF50',
    fontSize: 12,
    marginBottom: 4,
  },
  newsSnippet: {
    color: '#AAAAAA',
    fontSize: 14,
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 32,
  },
  emptyText: {
    color: '#888888',
    fontSize: 16,
  },
});

export default News;
