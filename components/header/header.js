import React from 'react';
import { Text, View } from 'react-native';

import styles from './header-styles';

const HeaderText = (props) => { 
    const { title } = props;
    return <Text style={styles.headerText}>{`Лента новостей`}</Text>
}

const HeaderSubText = (props) => { 
    const {text } = props;
    return <Text style={styles.headerSubText}>{text}</Text>
}

export default Header = (props) => {
    const { title, text } = props;
    return (
        <View style={styles.container}>
            <HeaderText title={title}/>
            <HeaderSubText text={text}/>
        </View>
    )
}