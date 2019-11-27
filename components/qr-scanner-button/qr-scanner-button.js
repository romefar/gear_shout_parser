import React from 'react'
import { StyleSheet, Button, View, TouchableOpacity, SafeAreaView} from 'react-native';

import styles from './qr-scanner-button-styles';

export default QRButton = (props) => {
    const {handler} = props; 
    return(
       <View style={styles.scanButtonContainer}>
            <Button onPress={handler} color={'white'} style={styles.scanButton} title={`QR`}/>
       </View>
    );
}
