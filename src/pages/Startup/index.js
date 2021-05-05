import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import fonts from '../../Styles/fonts';
import { useNavigation } from '@react-navigation/core';

export default function Startup() {
  const navigation = useNavigation();  
  
function handleStart(){
    navigation.navigate('SignIn')
}

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
            <Text style={styles.title}>Aviso importante !!!</Text>
            <Text style={styles.text}>O programa a seguir é apenas um projeto de controle de gasto, usando o firabase para criar cadastro, logar e fazer a interação. estou sempre aberto a sugestões </Text>
            <Text style={{fontSize:50}}>😁</Text>
            <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={handleStart}>
                <Text style={styles.subButton}>OK</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    wrapper:{
        flex: 1,
        backgroundColor: '#131313',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 5
    },
    text :{
        color: '#fff',
        marginHorizontal: 20,
        fontSize: 15,
        fontFamily: fonts.text
    },
    title:{
        color: '#fff',
        fontSize: 25,
        fontFamily: fonts.heading
    },
    button :{

      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      borderRadius: 16,
      height: 56,
      width:76,
      backgroundColor: '#2F8C00'
    },
    subButton:{
      color: '#fff',
      fontSize: 24
    }
  });