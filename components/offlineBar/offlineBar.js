import React, { PureComponent } from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');


MiniOfflineSign = () => {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>You went offline</Text>
    </View>
  );
}

class OfflineNotice extends PureComponent {

    state = {
        isConnected: true
    };

    handleConnectivityChange = (isConnected) => {
        this.setState({ isConnected });
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
     }

    render() {
        if (!this.state.isConnected) {
            setTimeout(() => {
              this.setState({
                isConnected: true
              })
            }, 2000);
            return <MiniOfflineSign />;
          }
          return null;
    }
}
const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    top: 30,
    zIndex: 90000
  },
  offlineText: { 
    color: '#fff'
  }
});
export default OfflineNotice;