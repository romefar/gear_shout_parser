import { StyleSheet, PixelRatio } from 'react-native';

export default styles = StyleSheet.create({
    container: { 
        marginBottom: 10,
        borderBottomColor: 'rgb(217, 217, 217)',
        borderBottomWidth: 1, 
        borderStyle: 'solid',
        paddingBottom: 10
    },
    headerText: {
        color: '#3a3939',
        fontSize: PixelRatio.getPixelSizeForLayoutSize(12),
        textAlign: 'center',
        marginTop: 0,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    headerSubText: { 
        color: '#262626',
        fontSize: PixelRatio.getPixelSizeForLayoutSize(10),
        textAlign: 'justify',
    }
});