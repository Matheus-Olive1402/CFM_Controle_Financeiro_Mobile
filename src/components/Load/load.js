import React from 'react';
import {StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';

import loadAnimation from '../Assets/13398-money-stack.json';

export function Load(){
    return(
        <view style={styles.container}>
            <LottieView
                source={loadAnimation}
                autoPlay
                loop
                style={styles.animation}
            />
        </view>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    animation:{
        backgroundColor: 'transparent',
        width: 200,
        height: 200
    }
})