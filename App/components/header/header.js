import React from 'react';
import {Image,Dimensions,StatusBar ,Text} from 'react-native';
import { Header, Left, Body, Button, Right,Title } from 'native-base';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import colors from '../../assets/colors/colors';
const {width,height} =  Dimensions.get('window'); 

export const Commonheader =  ({backgroundColor="white", barStyle="dark-content",BgColor, marginTop  =0,transparent=false, title,rightImgsourceOne,rightText,rightImgsourceTwo,rightActionone,leftImgsource,leftAction,rightActiontwo}) => {
    return (
        <Header transparent ={transparent} style={{backgroundColor:BgColor,marginTop:marginTop}}  >
            {/* <StatusBar
                   backgroundColor={backgroundColor}
                   barStyle={barStyle}
                /> */}
            <Left style={{flex:1}}>
                <Button transparent onPress = {leftAction} hitSlop={{top: 20, bottom: 20, left: 50, right: 80}}>
                    <Image source={leftImgsource}></Image> 
                </Button>
            </Left>
            <Body style={{flex:1}}>
                <Title style={[{alignSelf:'center',width:width-100,color:colors.white}]}>{title}</Title>
            </Body>
            <Right style={{flex:1}}>
                <Button transparent onPress = {rightActionone} hitSlop={{top: 20, bottom: 20, left: 50, right: 80}}>
                    <Image source={rightImgsourceOne}></Image>
                </Button>
                <Text style={{color:colors.white,fontSize:15,fontWeight:'600',alignSelf:"center"}} >{rightText}</Text>
                <Button transparent onPress = {rightActiontwo} hitSlop={{top: 20, bottom: 20, left: 50, right: 80}}>
                    <Image source={rightImgsourceTwo}></Image>
                </Button>
            </Right>
        </Header> 
      
    );
  }
