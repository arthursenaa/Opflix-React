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
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import jwt_decode from 'jwt-decode';


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
            token: '',
            jwToken: '',
            lancamento: [],
            generos: [],
            generoNome: [
                // {
                //     'nome': 'oi',
                //     'duracao': 'oioio'
                // }
            ],
            generoEscolhido: null,

        };
    }


    _buscarGeneros = async () => {
        await fetch('http://192.168.6.115:5000/api/categoria')
            .then(resposta => resposta.json())
            .then(data => this.setState({ generos: data }))
    };

    // _buscarPorNome = async () => {
    //     if (this.state.generoEscolhido != 0) {

    //         await fetch('http://192.168.6.115:5000/api/categoria/' + this.state.generoEscolhido)
    //             .then(resposta => resposta.json())
    //             .then(data => this.setState({ generoNome: data }))
    //     } else {
    //         alert('erro')
    //     }
    // };

    _carregarFilmes = async () => {
        await fetch('http://192.168.6.115:5000/api/lancamento', {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.state.token,
                'Content-Type': 'application/json'
            },
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ lancamento: data }))
        // .catch(erro => console.warn(erro));
    };

    _decodeToken = async () => {
        try {
            const tokenOpflix = await AsyncStorage.getItem('@opflix:token')
            if (tokenOpflix != null) {
                this.setState({ token: tokenOpflix })
                this.setState({ jwToken: jwt_decode(tokenOpflix) })
            }
        } catch{
            // alert('TOKEN==NULL')
        }
        // alert(this.state.jwToken)
        this._carregarFilmes();
    }

    _onChageValue = (value) => {
        this.setState({ generoEscolhido: value })
        // alert(this.state.generoNome)
    }

    componentDidMount() {
        this._buscarGeneros();
        this._decodeToken();
    }

    render() {
        return (
            <View style={{ backgroundColor: '', height: "100%" }}>
                <StatusBar backgroundColor="black" />
                <Text style={styles.Titulo}>Filtrar Por Genero</Text>

                <Picker
                    selectedValue={this.state.generos}
                    onValueChange={this._onChageValue.bind(this)}
                    style={styles.picker}
                >
                    {/* <Picker.Item label="Selecione" disabled Picker/> */}
                    {this.state.generos.map(element => {
                        return <Picker.Item label={element.nome} value={element.idGenero} onPress={() => this._buscarPorNome()} />
                    })}
                </Picker>



                <FlatList
                    style={styles.lista}
                    data={this.state.lancamento.filter(element => {
                        return element.idGenero === this.state.generoEscolhido
                    }
                    )}
                    keyExtractor={item => item.idLancamentos}
                    renderItem={({ item }) => (
                        <View>
                            <Collapse>
                                <CollapseHeader>
                                    <Text style={{ color: "white", fontSize: 15, marginTop:'5%' }}>   - {item.nome} </Text>
                                </CollapseHeader>
                                <CollapseBody style={{backgroundColor:'#1a1a1a', borderBottomLeftRadius: 25,borderBottomRightRadius: 25,}}>
                                    <Text style={styles.item}> -- Sinopse : {item.sinopse}</Text>
                                    <Text style={styles.item}> - Duração : {item.duracao}</Text>
                                    <Text style={styles.item}> - Classificação Indicativa : {item.classificacaoIndicativa}</Text>
                                </CollapseBody>
                            </Collapse>
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
    lista: {
        backgroundColor: '#1a1a1a',
        marginLeft: '15%',
        width: '70%',
        marginTop: '5%',
        marginBottom: '15%',
        borderRadius: 15
    },
    picker: {
        marginTop: '10%',
        marginLeft: '15%',
        width: '70%',
        position: 'relative',
        // backgroundColor: 'white',
    },
    item: {
        marginTop:'2%',
        marginBottom:'2%',
        color: "white", 
        marginLeft: '10%',
        
    },
    
})

export default filtro;