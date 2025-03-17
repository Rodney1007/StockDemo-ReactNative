/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './src/json/app.json';
import TabNavigator from './src/navigation/TabNavigator';

AppRegistry.registerComponent(appName, () => TabNavigator);
