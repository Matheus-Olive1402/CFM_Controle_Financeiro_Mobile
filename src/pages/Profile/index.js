/*
  Componente de Perfil do usuário
*/
import React, { useContext }  from 'react';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import {Text, StyleSheet} from 'react-native';

import { AuthContext } from '../../contexts/auth';
import fonts from '../../Styles/fonts';

import {Container, Nome, NewLink, NewText, Logout, LogoutText} from './styles';

export default function Profile() {
 const navigation = useNavigation();

 const { user, signOut } = useContext(AuthContext);

 return (
   <Container>
      <Header/>
       <Text style={styles.text}>
         {user && user.nome}
       </Text>
       <NewLink onPress={ () => navigation.navigate('Registrar') } >
         <NewText>Registrar gastos</NewText>
       </NewLink>

       <Logout onPress={ () => signOut()}>
         <LogoutText>Sair</LogoutText>
       </Logout>
   </Container>
  );
}

const styles = StyleSheet.create({
  text:{
    fontFamily: fonts.heading,
    alignItems: 'center',
    fontSize: 28,
    marginTop: 25,
    marginBottom: 25,
    color: '#fff'
  }
})