import React, { Component, Fragment } from 'react';
import { Dimensions, ScrollView, View, NetInfo, Text } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import NewsHeaderText from '../news-header-text/';
import NewsDescriptionText from '../news-description-text/';
import NewsDateText from '../news-date-text/';
import Loader from '../loader';
import ErrorModal from '../error-modal';
import QRCode from 'react-native-qrcode-svg';

const uuidv1 = require('uuid/v1');

import styles from './news-view-style';

class NewsView extends Component {

    state = {
        data: {},
        loading: true,
        error: false
    }

    handleConnectivityChange = (isConnected) => {
        this.setState({ error: !isConnected });
    }   

    async componentDidMount() { 
        try {
            const id = this.props.navigation.getParam('id', 'default value');
            // console.log(`ID FROM PROPS ${id}`);
             const service = this.props.navigation.getParam('service', 'default value');
             const data = await service.getNewsBy(id);
             this.setState({
                 data,
                 loading : false
             })
        } catch (error) {
            this.setState({error : true, loading : false});
            this.props.navigation.goBack();
        }
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    renderBody = (text, images) => {
        // console.log(images);
        let srcImages = [...images];
        const jsx = text.map((item, i) => {
            if (i % 2 === 0 && srcImages.length > 0)
                return <AutoHeightImage source={{ uri: srcImages.shift() }}
                    width={Dimensions.get('screen').width - 20}
                    resizeMode="contain"
                    style={styles.cacheImage}
                    resizeMethod="resize"
                    key={uuidv1()} />
            else
                return <NewsDescriptionText key={uuidv1()} desc={item} />
        
        });;

        while (srcImages.length > 0) {
            jsx.push(<AutoHeightImage source={{ uri: srcImages.shift() }}
                width={Dimensions.get('screen').width - 20}
                resizeMode="contain"
                style={styles.cacheImage}
                resizeMethod="resize"
                key={uuidv1()} />)
        }
        return jsx;
    }

    renderItem = (title, author, date, text, images, qrLink) => {
        return (
            <View style={styles.container}>
                <NewsHeaderText text={title} />
                <NewsDateText date={`${author} | ${date}`} />
                {this.renderBody(text, images)}
                <Text style={styles.qrText}>Поделиться новостью:</Text>
                <View style={styles.qrContainer}>                
                    <QRCode
                        value={qrLink}
                        size={300} />
                </View>
            </View>
        );
    }
    
    render() { 
        const { title, author, date, text, images, qrLink } = this.state.data;
        const { loading, error } = this.state;
        return (
            <ScrollView>
                {loading ? <Loader visible={loading} /> : error ? <ErrorModal /> : this.renderItem(title, author, date, text, images, qrLink) }
            </ScrollView>
        )
    }
}

export default NewsView;