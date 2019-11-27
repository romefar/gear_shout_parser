import React from 'react';
import { Text } from 'react-native';

import styles from './news-header-textStyles';

export default NewsHeaderText = (props) => {
    const { text } = props;
    return (
        <Text style={styles.headerText}>{text}</Text>
    )
}