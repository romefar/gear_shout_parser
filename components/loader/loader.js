import React from 'react';
import { ActivityIndicator, View, Modal } from 'react-native';
import styles from './loaderStyles';

export default Loader = (props) => {
    const color = '#1c1c1c';
    const size = 'large';
    const animating = true;
    const animationType = 'none';

    return (
        <Modal visible={props.visible} animationType={animationType}>
            <View style={styles.container}> 
                <ActivityIndicator style={styles.loader} color={color} size={size} animating={animating} />
            </View>
        </Modal>
    )
}