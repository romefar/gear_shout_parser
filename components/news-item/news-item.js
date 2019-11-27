import React, { Component } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import NewsHeaderText from '../news-header-text/';
import NewsDescriptionText from '../news-description-text/';
import NewsDateText from '../news-date-text/';
import styles from './news-itemStyle';

class NewsItem extends Component {
    render() { 
        const { title, id, img, description, date, comments } = this.props.item;
        const { handler, service } = this.props;
        return (
            <View style={styles.container} >
                <TouchableOpacity onPress={() => handler(id, service)} style={styles.opacityView} activeOpacity={0.5}>
                    <NewsHeaderText text={title} />
                    <NewsDateText date={date} />
                    <AutoHeightImage source={{ uri: img }}
                        style={{ resizeMode: 'contain' }}
                        width={Dimensions.get('screen').width - 20}
                        resizeMode="contain"
                        resizeMethod="resize"
                    />
                    <NewsDescriptionText desc={description} />
                </TouchableOpacity>
            </View>
        )
    }
}

export default NewsItem;