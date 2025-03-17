import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { StockType } from './StockTypeFilter';

interface HeaderProps {
  title: string;
  leftComponent?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, leftComponent }) => {
  return (
    <View style={styles.headerGradient}>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          {leftComponent}
        </View>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.rightSection} />
      </View>
      <View style={styles.headerGlow} />
    </View>
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
    alignItems: 'flex-start',
  },
  rightSection: {
    flex: 1,
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
});

export default Header; 