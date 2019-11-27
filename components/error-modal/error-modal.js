import React from 'react';
import { Text, View, Modal } from 'react-native';
import styles from './error-modal-style';

export default ErrorModal = (props) => {
    const animationType = 'none';
    return (
        <Modal visible={props.visible} animationType={animationType}>
            <View style={styles.container}> 
               <Text>You are offline. Check your internet connection.</Text>
            </View>
        </Modal>
    )
}