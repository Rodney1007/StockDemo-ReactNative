import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import WatchList from '../screens/WatchList.tsx';
import StockList from '../screens/StockList.tsx';
import News from '../screens/News.tsx';

type TabIconProps = {
  color: string;
  size: number;
};

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
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#666666',
        }}
      >
        <Tab.Screen
          name="StockList"
          component={StockList}
          options={{
            tabBarLabel: '股票',
            tabBarIcon: ({ color, size }: TabIconProps) => (
              <Icon name="trending-up" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="WatchList"
          component={WatchList}
          options={{
            tabBarLabel: '自選',
            tabBarIcon: ({ color, size }: TabIconProps) => (
              <Icon name="star" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="News"
          component={News}
          options={{
            tabBarLabel: '新聞',
            tabBarIcon: ({ color, size }: TabIconProps) => (
              <Icon name="article" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
