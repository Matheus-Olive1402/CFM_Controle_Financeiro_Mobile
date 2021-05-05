/*
Tela esquerda do main

*/

import React, { useContext } from 'react';
import { View, Text, Image} from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import { AuthContext } from '../../contexts/auth';
import fonts from '../../Styles/fonts';

export default function CustomDrawer(props) {
    const { user, signOut, loadingAuth } = useContext(AuthContext);
    

 return (
   <DrawerContentScrollView  {...props} >
       <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 25}}>
           <Image
           source={require('../../assets/Logo.png')}
           style={{width: 85, height: 85}}
           resizeMode="contain"
           />

           <Text style={{color: '#FFF', fontSize: 20, marginTop: 5, fontFamily: fonts.text}}>
               Bem-vindo
           </Text>
           <Text style={{color: '#FFF', fontSize: 19, fontWeight: 'bold', paddingBottom: 25,fontFamily: fonts.heading}}>
               {user && user.nome}
           </Text>
       </View>

      <DrawerItemList {...props} />

      <DrawerItem
      {...props}
      label="Sair do app"
      inactiveBackgroundColor="#c62c36"
      onPress={ () => signOut() }
      />
   </DrawerContentScrollView>
    //signOut
  );
}