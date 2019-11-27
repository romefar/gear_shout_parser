import React, { Component } from 'react';
import { StyleSheet, Text, Dimensions, ScrollView, SafeAreaView} from 'react-native';
import OfflineNotice from '../offlineBar';
import GearshoutService from '../../services/gearshoutservice';
import Header from '../header';
import Loader from '../loader';
import NewsItem from '../news-item';
import QRButton from "../qr-scanner-button";

import styles from './news-list-styles';

class NewsList extends Component {

  state = { 
    loading : true,
    error : false,
    news : null,
    header : null,
    description: null
  }

  gearshoutService = new GearshoutService();

  async componentDidMount() {
    try {
      const data = await this.gearshoutService.fetchData();
      const header = this.gearshoutService.header;
      const description = this.gearshoutService.description;
      this.setState({
        loading: false,
        news: data,
        header,
        description
      })
    } catch (error) {
      this.setState({
        error: true
      })
    }
  }

    onNewsPress = (id, service) => {
        this.props.navigation.navigate('NewsView', {
            id,
            service
        });
    }

  qrCodeHandler = () => {
    this.props.navigation.navigate('qrScannerView');
  }

  renderNews = (items) => {
    return items.map(item => <NewsItem handler={this.onNewsPress} service={this.gearshoutService} key={item.id} item={item} />);
  }

  render() {
    const { loading, news, description, header } = this.state;
    return (
      <SafeAreaView>
        <OfflineNotice />
        <ScrollView style={styles.container}>
          <Header text={description} title={header} />
          {loading ? <Loader visible={loading} /> : this.renderNews(news)}
        </ScrollView>
        <QRButton handler = {this.qrCodeHandler}/>
      </SafeAreaView>
    );
  }
} 


export default NewsList;
