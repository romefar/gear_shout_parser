import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Alert, Linking} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

import styles from './qr-scanner-styles';

export default class QRScanner extends Component {

    state = {
        hasCamerPermission: null,
        scanned: false,
    }

    async componentDidMount() {
        this.getPermissionsAsync();
    }

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    render() {
        const { hasCameraPermission, scanned } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <View
                style={styles.barCodeContainer}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />

                {scanned && (
                    <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
                )}
            </View>
        );
    }

    handleBarCodeScanned = ({data }) => {
        this.setState({ scanned: true });
        Alert.alert(
            'Open this URL via your default browser?',
           data,
            [
              {
                text: 'Yes',
                onPress: () => Linking.openURL(data),
              },
              { text: 'No', onPress: () => {} },
            ],
            { cancellable: false }
          );
      };
}