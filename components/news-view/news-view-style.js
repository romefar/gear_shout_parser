import { StyleSheet, PixelRatio } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        // color: '#7b7976',
        // fontSize: PixelRatio.getPixelSizeForLayoutSize(10),
        // textAlign: 'justify',
        // marginBottom: 0
        paddingLeft: 10,
        paddingRight: 10
    },
    qrContainer: { 
        flexDirection: 'row',
        alignSelf: "center",
        paddingTop: 25,
        paddingBottom: 25
    },  
    cacheImage: { 
        resizeMode: 'contain',
        marginTop: 10,
        marginBottom: 10
     },
     qrText: {
        color: '#3a3939',
        textAlign: "center",
        paddingTop: 10,
        fontSize: PixelRatio.getPixelSizeForLayoutSize(15),
        lineHeight: 30
      }
});