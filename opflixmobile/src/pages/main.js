import React, { Component } from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    TextInput,
    AsyncStorage,
    TouchableOpacity,
    View,
    Text,
    Image,
    StatusBar,
} from 'react-native';



class main extends Component {

    constructor() {
        super();
        this.state = {
          lancamento: []
        };


    _carregarEventos = async () => {
        await fetch('http://192.168.7.85:5000/api/lancamento')
          .then(resposta => resposta.json())
          .then(data => this.setState({lancamento: data}))
          .catch(erro => console.warn(erro));
      };


    componentDidMount(){
        this._carregarEventos();
    }

    render() {
        return (
            <View style={{ backgroundColor: 'grey', height: "100%" }}>
                <StatusBar backgroundColor="black" />

            </View>
        )
    }
}

export default main;