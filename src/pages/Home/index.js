import React, { useContext, useState, useEffect } from 'react';
import { Alert, TouchableOpacity, Platform, StyleSheet, Text } from 'react-native';
import firebase from '../../services/firebaseConnection';
import { format, isBefore } from 'date-fns';

import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';
import HistoricoList from '../../components/HistoricoList';

import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from '../../components/DatePicker';

import { Background, Container, Nome, Saldo, Title, List, Area} from './styles';
import fonts from '../../Styles/fonts';

export default function Home() {
  const [historico, setHistorico] = useState([]);
  const [saldo, setSaldo] = useState(0);

  const { user } = useContext(AuthContext);
  const uid = user && user.uid;

  const [newDate, setNewDate] = useState(new Date());
  const [show, setShow] = useState(false);

  //o 1º await faz a função ir no banco de dados é pegar o users/saldo é vai apontar para setsaldo (o valor)
  //o 2º await faz a função ir no banco de dados é pegar o historico/uid(key do usuario) sendo que vai pegar a data que estiver na 'new Data' por padrão vai ser hoje e no limite de 10 itens
  //o snapshot vai fazer um forEach para buscar key,tipo e etc no bd é enviar para 'list'
  //na parte de baixo o setHistorico usa o oldarray para não repetir os dados do foreach e de forma reversa do mais novo para o mais velho

  //na ultima linha o useEffext só vai ser executado novamente quando o newdate sofre alguma alteração
  useEffect(()=>{
    async function loadList(){
      await firebase.database().ref('users').child(uid).on('value', (snapshot)=>{
        setSaldo(snapshot.val().saldo);
      });

      await firebase.database().ref('historico')
      .child(uid)
      .orderByChild('date').equalTo(format(newDate, 'dd/MM/yyyy'))
      .limitToLast(10).on('value', (snapshot)=>{
        setHistorico([]);

        snapshot.forEach((childItem) => {
          let list = {
            key: childItem.key,
            tipo: childItem.val().tipo,
            valor: childItem.val().valor,
            date: childItem.val().date,
          };
          
          setHistorico(oldArray => [...oldArray, list].reverse());
        })
      })

    }

    loadList();
  }, [newDate]);

//caso no fim, você aceita vai ser realizado a chamada para outra função
  function handleDelete(data){
    //para tirar a regra de apenas no dia atual pode apagar , basta apagar os 5 const 2 console.log e o if


    //Pegando data do item:
    //1º linha é para deixa no padrão de dados com '/'
    //2º uma variavel para receber o formato
    const [diaItem, mesItem, anoItem] = data.date.split('/');
    const dateItem = new Date(`${anoItem}/${mesItem}/${diaItem}`);
    console.log(dateItem);

    //Pegando data hoje:
    //1º aplicando o formato de tempo
    //2º linha é para deixa no padrão de dados com '/'
    //3º uma variavel para receber o formato
    const formatDiaHoje = format(new Date(), 'dd/MM/yyyy');
    const [diaHoje, mesHoje, anoHoje] = formatDiaHoje.split('/');
    const dateHoje = new Date(`${anoHoje}/${mesHoje}/${diaHoje}`);
    console.log(dateHoje);

    

    if( isBefore(dateItem, dateHoje) ){
      // Se a data do registro já passou vai entrar aqui!
      alert('Voce nao pode excluir um registro antigo!');
      return;
    }

    Alert.alert(
      'Cuidado Atençao!',
      `Você deseja excluir ${data.tipo} - Valor: ${data.valor}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => handleDeleteSuccess(data)
        }
      ]
    )

  }

// o await vai no bd historico/uid vai pegar o no/campo data (que foi informado na funçaõ acima) é removido do bd
// então (then) vai ter um variavel saldoAtual vai recebe o saldo no bd , então vai ser aplicado um if no tipo (se for receita + e despesa -)
// o await vai o 'saldoAtual' no saldo que ta no bd
  async function handleDeleteSuccess(data){
    await firebase.database().ref('historico')
    .child(uid).child(data.key).remove()
    .then( async ()=>{
      let saldoAtual = saldo;
      data.tipo === 'despesa' ? saldoAtual += parseFloat(data.valor) : saldoAtual -= parseFloat(data.valor);

      await firebase.database().ref('users').child(uid)
      .child('saldo').set(saldoAtual);
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  // f1,f2 e const = são relacionado ao calendario (picker)
  //f1 = ao cliclar exibir
  //f2 = ao cliclar desativar a exibição
  //const 1 para qunado for ios mudar o layouy, enviar um nova data para 'date' assim ativando o useEffect
  //existe uma variavel show só pra parte de fechar e os restantes

  function handleShowPicker(){
    setShow(true);
  }

  function handleClose(){
    setShow(false);
  }

  const onChange = (date) => {
    setShow(Platform.OS === 'ios');
    setNewDate(date);
    console.log(date);
  } 
// em renderItem o historicolis é os icons e esta enviando o data e deleteitem
// Show chama o DataPicker para fazer o layout da biblioteca e fazer a funcionalidade de escolha
 return (
    <Background>
      <Header/>
      <Container>
        <Text style={styles.text}>{user && user.nome}</Text>
        <Saldo>R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Saldo>
      </Container>

      <Area>
        <TouchableOpacity onPress={handleShowPicker}>
          <Icon name="event" color="#FFF" size={30}  />
        </TouchableOpacity>
        <Text style={styles.title}>Ultimas movimentações</Text>
      </Area>

      <List
      showsVerticalScrollIndicator={false}
      data={historico}
      keyExtractor={ item => item.key}
      renderItem={ ({ item }) => ( <HistoricoList data={item} deleteItem={handleDelete} /> )}
      />
      
      {show && (
        <DatePicker
        onClose={handleClose}
        date={newDate}
        onChange={onChange}
        />
      )}

    </Background>
    //list é referente a caixa branca que tem as informações, 1º informações em vertical,  2] a variavel local com dados
  );

}

//utilizar as fonts do google, pois o component style não possui
const styles = StyleSheet.create({
  text:{
    fontSize: 19,
    color:'#fff',
    fontFamily: fonts.heading
  },
  title:{
    marginLeft: 5,
    color: '#00b94a',
    marginBottom: 10,
    fontFamily: fonts.text,
    fontSize:15
  }
})