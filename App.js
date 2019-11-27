import React, { Component } from 'react';
import { StyleSheet, Text, Dimensions, ScrollView, SafeAreaView} from 'react-native';
import OfflineNotice from './components/offlineBar';
import GearshoutService from './services/gearshoutservice';
import Header from './components/header';
import Loader from './components/loader';
import NewsItem from './components/news-item';
import NewsView from './components/news-view';
import AppNavigator from './components/app-navigation';

class App extends Component {
  render() { 
    return <AppNavigator />
  }
}

export default App;
