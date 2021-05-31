/* 

Componente de menu no header de forma fixa

*/
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import {Container, ButtonMenu} from './styles';

export default function Header() {
 const navigation = useNavigation();

 return (
   //Icone de hamburgue que faz a navegação
   <Container>
       <ButtonMenu onPress={ () => navigation.toggleDrawer() }>
         <Icon name="menu" color="#FFF" size={35} />
       </ButtonMenu>
   </Container>
  );
}