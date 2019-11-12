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
    FlatList,
    Picker,
} from 'react-native';



class filtro extends Component {
    static navigationOptions = {
        tabBarIcon: () => (
            <Image
                source={require('../assets/img/filter.png')}
                style={styles.tabBarEstilizacao}
            />
        ),
    };


    constructor() {
        super();
        this.state = {
            generos: [],
            generoNome: [],
            generoEscolhido: null,

        };
    }


    _buscarGeneros = async () => {
        await fetch('http://192.168.6.115:5000/api/categoria')
            .then(resposta => resposta.json())
            .then(data => this.setState({ generos: data }))
    };

    _buscarPorNome = async () => {
        if ( this.state.generoEscolhido != 0){

            await fetch('http://192.168.6.115:5000/api/categoria/' + this.state.generoEscolhido)
            .then(resposta => resposta.json())
            .then(data => this.setState({ generoNome: data }))
        } else {
            alert('erro')
        }
    };

    _onChageValue = (value) => {
        this.setState({ generoEscolhido: value })
    }

    componentDidMount() {
        this._buscarGeneros();
        // this._buscarPorNome();
    }

    render() {
        return (
            <View style={{ backgroundColor: '', height: "100%" }}>
                <StatusBar backgroundColor="black" />
                <Text style={styles.Titulo}>Filtrar Por Genero</Text>

                <Picker
                    placeholder="Generos"
                    selectedValue={this.state.generos}
                    onValueChange={this._onChageValue.bind(this)}
                    style={styles.picker}
                >
                    {this.state.generos.map(element => {
                        return <Picker.Item label={element.nome} value={element.idGenero} />
                    })}
                </Picker>



                <FlatList
                    style={{ color: 'black' }}

                    data={this.state.generoNome}
                    keyExtractor={item => item.idGenero}
                    renderItem={({ item }) => (
                        <View>
                            <Text >{item.Nome}</Text>
                            {/* <Text >{item.DataLancamento}</Text> */}
                        </View>
                    )}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabBarEstilizacao: {
        width: 30, height: 30, tintColor: 'white'
    },
    Titulo: {
        color: "black",
        fontSize: 25,
        marginTop: '10%',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    // picker: {
    //     marginTop: '10%',
    //     backgroundColor: 'white',
    //     marginLeft:'15%',
    //     width:'70%',
    //     color:'black',
    //     fontWeight:'bold',
    //     textAlign:'center',
    // }
})

export default filtro;