import React from 'react';
import { Text } from 'react-native';

import styles from './news-description-textStyles';

export default NewsDescriptionText = (props) => {
    const { desc } = props;
    return (
        <Text style={styles.descriptionText}>{desc}</Text>
    )
}