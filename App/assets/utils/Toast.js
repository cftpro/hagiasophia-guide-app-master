import { Toast } from 'native-base';
import {StatusBar} from 'react-native'

export const ErrorToast = {
  showToast: (message, duration = 5000) => {
    Toast.show({
      text: message,
      duration,
      position: 'top',
      textStyle: { textAlign: 'left',fontSize:13,color:'white', marginTop: StatusBar.currentHeight},
      type: "danger",
      buttonText: 'Ok',
      buttonStyle:{marginTop: StatusBar.currentHeight},
      buttonTextStyle: {fontSize:12,textAlign:'right' },
    });
  },
};

export const SuccessToast = {
  showToast: (message, duration = 5000) => {
    Toast.show({
      text: message,
      duration,
      position: 'top',
      textStyle: { textAlign: 'left',fontSize:13,color:'white' , marginTop: StatusBar.currentHeight},
      buttonText: 'Ok',
      type: "success",
      buttonStyle:{marginTop: StatusBar.currentHeight},
      buttonTextStyle: {fontSize:12,textAlign:'right' },
    });
  },
};