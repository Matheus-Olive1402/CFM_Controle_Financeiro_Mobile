import React from 'react';
//comecei a usar o picker do github do user: semantic-release-bot porém tive problemas logo usei o padrão do react, por isso tem o RNP
import {Picker as RNPickerSelect} from '@react-native-community/picker';
import { PickerView } from './styles';

//o picker aqui , envia o onchange (com a escolha) e o tipo (valor selicionado)
export default function Picker({ onChange, tipo }){
    return(
        <PickerView>
            <RNPickerSelect
            style={{width:'100%'}}
            selectedValue={tipo}
            onValueChange={(valor) => onChange(valor)}
            >
                <RNPickerSelect.Item label="Escolher um operação" value="operacao" />
                <RNPickerSelect.Item label="Receita" value="receita" />
                <RNPickerSelect.Item label="Despesa" value="despesa" />
            </RNPickerSelect>
        </PickerView>
    )
}
