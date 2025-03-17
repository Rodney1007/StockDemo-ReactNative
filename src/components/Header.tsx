import React from 'react';
import { View, Text, StyleSheet, StatusBar, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
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
        <Text style={styles.headerTitle}>{title}</Text>
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
});

export default Header; 