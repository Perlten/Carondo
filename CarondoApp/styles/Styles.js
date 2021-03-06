import { StyleSheet, Dimensions} from 'react-native';


const win = Dimensions.get('window');

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: 100,
        paddingTop:7,
        // alignItems: 'center',
        // justifyContent: 'flex-end',
    },
    container2: {
        justifyContent: 'flex-end',
    },container3: {
        alignSelf: 'center',
        paddingBottom: 25,
    },input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    }, button: {
        width: 260,
        alignItems: 'center',
        borderColor: "black",
        margin: 10,
        backgroundColor: '#2196F3'
    },buttonText: {
        padding: 20,
        fontSize: 24,
        color: 'white'
    },
    image: {
        flex: 1,
        alignSelf: 'stretch',
        width: win.width,
        height: 100,
        
    },
    search:{
        width: 30,
        height: 30,
      },
    button2:{
        backgroundColor: "red"
    },
    title:{
        fontSize: 25,
    }

});

export default Styles;