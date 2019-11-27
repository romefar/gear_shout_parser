import React from 'react';
import { Text } from 'react-native';

import styles from './news-date-textStyles';

export default NewsDateText = (props) => {
    const { date } = props;
    return (
        <Text style={styles.dateText}>{date}</Text>
    )
}