import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { StockType } from './StockTypeFilter';

interface HeaderProps {
  title: string;
  rightComponent?: React.ReactNode;
  isSearching: boolean;
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onSearchCancel: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  rightComponent,
  isSearching,
  searchQuery,
  onSearchChange,
  onSearchCancel,
}) => {
  return (
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
        {isSearching ? (
          <>
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={onSearchChange}
              placeholder="搜尋股票代號或名稱"
              placeholderTextColor="#999999"
              autoFocus
            />
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onSearchCancel}
            >
              <Text style={styles.cancelText}>取消</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => onSearchChange('')}
            >
              <Icon name="search" size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{title}</Text>
            <View style={styles.rightSection}>
              {rightComponent}
            </View>
          </>
        )}
      </View>
      <View style={styles.headerGlow} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerGradient: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
  },
  leftSection: {
    flex: 1,
  },
  rightSection: {
    position: 'absolute',
    right: 16,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
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
  searchInput: {
    flex: 1,
    height: 36,
    backgroundColor: '#333333',
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#FFFFFF',
    fontSize: 16,
    marginRight: 8,
  },
  searchButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#333333',
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  cancelButton: {
    padding: 8,
  },
  cancelText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default Header; 