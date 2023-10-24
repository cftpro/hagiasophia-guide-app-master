import {Dimensions,Platform} from 'react-native'
const {height,width} =  Dimensions.get('window');

export default {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    splashStyle:{
        width:'100%', 
        height: '100%'
    },
    SplashScreen_RootView: {
        justifyContent: 'center',
        flex:1,
        position: 'absolute',
        width: '100%',
        height: '100%',   
    },
    romanFont:{
        fontFamily:'HelveticaNeueLTStd-55_Roman' 
    },
    mediumFont:{
        fontFamily:'HelveticaNeueLTStd-Md_65_medium'
    },
    backBtnStyle:{
        height:44,        
        justifyContent:'center', 
        alignItems:'center', 
        flexDirection:'row', 
        width:width*0.15,
        marginTop:40,
    },
    backButton: {
        height: 44, 
        width: 44,    
    },
};