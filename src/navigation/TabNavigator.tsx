import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import WatchListScreen from '../screens/WatchListScreen.tsx';
import StocksScreen from '../screens/StocksScreen';
import NewsScreen from '../screens/NewsScreen.tsx';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#1E1E1E',
            borderTopColor: '#333333',
            height: Platform.OS === 'android' ? 80 : 60,
            paddingBottom: Platform.OS === 'android' ? 16 : 8,
          },
          tabBarActiveTintColor: '#D4AF37',
          tabBarInactiveTintColor: '#888888',
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '600',
            marginBottom: 4,
          },
          tabBarIconStyle: {
            marginTop: 4,
          },
        }}
      >
        <Tab.Screen
          name="Stocks"
          component={StocksScreen}
          options={{
            tabBarLabel: '股票',
            tabBarIcon: ({ color }) => (
              <Icon name="show-chart" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="WatchList"
          component={WatchListScreen}
          options={{
            tabBarLabel: '自選',
            tabBarIcon: ({ color }) => (
              <Icon name="star" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="News"
          component={NewsScreen}
          options={{
            tabBarLabel: '新聞',
            tabBarIcon: ({ color }) => (
              <Icon name="newspaper" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
