import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { StockType } from './StockTypeFilter';

interface HeaderProps {
  title: string;
  rightComponent?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, rightComponent }) => {
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
        <View style={styles.leftSection} />
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.rightSection}>
          {rightComponent}
        </View>
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
    flex: 1,
    alignItems: 'flex-end',
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