import React, { Component } from 'react';
import {
    View,
    StatusBar,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    AsyncStorage,
    TextInput,
    StyleSheet,
    FlatList
} from 'react-native';

import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import jwt_decode from 'jwt-decode';


class main extends Component {
    static navigationOptions = {
        tabBarIcon: () => (
            <Image
                source={require('../assets/img/filme.png')}
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
            ultimos: [],
            antigos: [],
        };
    }


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

    _carregarUltimos = async () => {
        await fetch('http://192.168.6.115:5000/api/lancamento/datad', {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.state.token,
                'Content-Type': 'application/json'
            },
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ ultimos: data }))
    };
    _carregarAntigos = async () => {
        await fetch('http://192.168.6.115:5000/api/lancamento/datac', {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.state.token,
                'Content-Type': 'application/json'
            },
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ antigos: data }))
    };

    _decodeToken = async () => {
        try {
            const tokenOpflix = await AsyncStorage.getItem('@opflix:token')
            if (tokenOpflix != null) {
                this.setState({ token: tokenOpflix })
                this.setState({ jwToken: jwt_decode(tokenOpflix) })
            }
        } catch{
            alert('TOKEN==NULL')
        }
        // alert(this.state.jwToken)
        this._carregarFilmes();
        this._carregarUltimos();
        this._carregarAntigos();
    }

    componentDidMount() {
        this._decodeToken();
    }

    render() {
        return (
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={{ backgroundColor: 'black', height: "100%" }}
            >

                <View style={{ backgroundColor: 'black', height: "100%", marginBottom: '5%' }}>

                    <StatusBar backgroundColor="black" />

                    <Text style={styles.Titulo} >Listas</Text>

                    {/* list */}
                    <Collapse>
                        <CollapseHeader style={styles.collapse}>
                            <View>
                                <Text style={{ textAlign: 'center', marginTop: '1%', fontSize: 17, fontWeight: 'bold' }}>Listar Filmes</Text>
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <FlatList
                                style={styles.lista}
                                data={this.state.lancamento}
                                keyExtractor={item => item.idLancamentos}
                                renderItem={({ item }) => (
                                    <View>
                                        <Text style={{ color: "white" }}>   {item.nome}  -  {item.duracao}</Text>
                                        <Text style={{ color: "white", height: 8 }}></Text>
                                    </View>
                                )}
                            />
                        </CollapseBody>
                    </Collapse>

                    {/* ultimos */}
                    <Collapse>
                        <CollapseHeader style={styles.collapse}>
                            <View>
                                <Text style={{ textAlign: 'center', marginTop: '1%', fontSize: 17, fontWeight: 'bold' }}>Ultimos Lançamentos</Text>
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <FlatList
                                style={styles.lista}
                                data={this.state.ultimos}
                                keyExtractor={item => item.idLancamentos}
                                renderItem={({ item }) => (
                                    <View>
                                        <Text style={{ color: "white" }}>   {item.nome}  -  {item.duracao}</Text>
                                        <Text style={{ color: "white", height: 8 }}></Text>
                                    </View>
                                )}
                            />
                        </CollapseBody>
                    </Collapse>

                    {/* antigos */}
                    <Collapse>
                        <CollapseHeader style={styles.collapse}>
                            <View>
                                <Text style={{ textAlign: 'center', marginTop: '1%', fontSize: 17, fontWeight: 'bold' }}>Mais Antigos</Text>
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <FlatList
                            // horizontal={true}
                                style={styles.lista}
                                data={this.state.antigos}
                                keyExtractor={item => item.idLancamentos}
                                renderItem={({ item }) => (
                                    <View>
                                        <Text style={{ color: "white" }}>   {item.nome}  -  {item.duracao}</Text>
                                        <Text style={{ color: "white", height: 8 }}></Text>
                                    </View>
                                )}
                            />
                        </CollapseBody>
                    </Collapse>
                </View>
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    tabBarEstilizacao: {
        width: 30, height: 30, tintColor: 'white'
    },
    Titulo: {
        color: "white",
        fontSize: 25,
        marginTop: '10%',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    lista: {
        backgroundColor: '#1a1a1a',
        marginLeft: '15%',
        width: '70%',
        // marginTop: '15%',
        // marginBottom: '15%',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        // height: '70%',
    },
    collapse: {
        backgroundColor: 'white',
        height: 30,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        marginTop: '10%',
        marginLeft: '15%',
        width: '70%',
    }
})

export default main;