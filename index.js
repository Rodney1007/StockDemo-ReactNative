/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './src/json/app.json';
import StockList from './src/screens/stocklist/StockList';

AppRegistry.registerComponent(appName, () => StockList);
