import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Colors from '../constants/Colors';
import { NewsItem as NewsItemType } from '../services/NewsService';

interface NewsItemProps {
  item: NewsItemType;
  onPress: (url: string) => void;
}

const NewsItem = ({ item, onPress }: NewsItemProps) => {
  return (
    <TouchableOpacity
      style={styles.newsItem}
      onPress={() => onPress(item.link)}
    >
      <View style={styles.newsHeader}>
        <View style={styles.stockTag}>
          <Text style={styles.stockTagText}>{item.stockName}</Text>
        </View>
        <Text style={styles.newsDate}>{item.publishDate}</Text>
      </View>
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Text style={styles.newsSource}>{item.source}</Text>
      <Text style={styles.newsSnippet} numberOfLines={2}>
        {item.snippet}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  newsItem: {
    backgroundColor: Colors.background.secondary,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stockTag: {
    backgroundColor: Colors.background.tertiary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderColor: Colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  stockTagText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  newsDate: {
    color: Colors.text.tertiary,
    fontSize: 12,
  },
  newsTitle: {
    color: Colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  newsSource: {
    color: Colors.primary,
    fontSize: 12,
    marginBottom: 4,
  },
  newsSnippet: {
    color: Colors.text.secondary,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default NewsItem; 