/*
Autor: Matheus de oliviera
Versão: 1.0.0

descrição:
De forma simples o aplicativo tem a função de ter um controle financeiro com gastos e despesas, podendo escolher
os dias de uso de gastos e com sistema de cadastro e login.

Tecnologias:
React Native (biblioteca javascript)
Firebase (BackEnd da google (utilização de noSQL))

Bibliotecas:
Por conta da quantidade está no aquivo bibliotecas.txt

Contato: matheus.olive1402@hotmail.com
*/

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StatusBar } from 'react-native';

console.disableYellowBox=true; //desabilitar a tela amarela (nesse caso não tem problema, porém deve analisar caso a caso)

import AuthProvider from './src/contexts/auth';
import {useFonts,Jost_400Regular,Jost_600SemiBold} from '@expo-google-fonts/jost';
import AppLoading from 'expo-app-loading';


import Routes from './src/routes/index';

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  })

  if (!fontsLoaded)
    return <AppLoading/>
  
  return (
   <NavigationContainer>
    <AuthProvider>
      <StatusBar backgroundColor="#131313" barStyle="light-content"/>
      <Routes/>
    </AuthProvider>
    </NavigationContainer>
  );
}