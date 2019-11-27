import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import NewsView from '../news-view';
import NewsList from '../news-list';
import QRScanner from '../qr-scanner';


const AppNavigator = createStackNavigator({
    NewsList: {
        screen: NewsList,
        navigationOptions: {
            header: null,
        },
    },
    NewsView: { screen: NewsView }, 
    qrScannerView : { screen : QRScanner}
},
    {
        initialRouteName: 'NewsList',
    });

export default createAppContainer(AppNavigator);