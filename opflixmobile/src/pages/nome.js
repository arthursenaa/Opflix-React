import React, { Component } from 'react';
import {
    View,
    StatusBar,
    Text,
    Image,
    TouchableOpacity,
    AsyncStorage,
    TextInput,
    StyleSheet,
    FlatList
} from 'react-native';



class nome extends Component {
    static navigationOptions = {
        tabBarIcon: () => (
            <Image
                source={require('../assets/img/lupa.png')}
                style={styles.tabBarEstilizacao}
            />
        ),
    };


    constructor() {
        super();
        this.state = {
            nome: null,
            lancamento: [],
        };
    }


    _carregarFilmes = async () => {
        await fetch('http://192.168.6.115:5000/api/lancamento' + this.state.nome, {
            headers: {
                'Authorization': 'Bearer ' + AsyncStorage.getItem("@opflix:token"),
                'Content-Type': 'application/json'
            },
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ lancamento: data }))
            .catch(erro => console.warn(erro));
    };


    componentDidMount() {
        this._carregarFilmes();
    }

    render() {
        return (
            <View style={{ backgroundColor: 'black', height: "100%" }}>
                <StatusBar backgroundColor="black" />
                <Text style={styles.Titulo}>Buscar Por Nome</Text>
                {/* style={{ color: "white" }} */}
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabBarEstilizacao: {
        width: 30, height: 30, tintColor: 'white'
    },
    Titulo:{
        color:"white",
        fontSize: 25,
        marginTop: '10%',
        textAlign:'center',
        fontWeight:'bold'
    }
})

export default nome;