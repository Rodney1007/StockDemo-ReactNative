/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/screens/App';
import {name as appName} from './src/json/app.json';
import StockList from './src/screens/StockList';

AppRegistry.registerComponent(appName, () => StockList);
