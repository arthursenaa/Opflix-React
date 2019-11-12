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


    _carregarPorNome = async () => {
        await fetch('http://192.168.6.115:5000/api/lancamento/titanic' + this.state.nome)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        lancamento: response.data
                    })
                } else {
                }
            })
            .catch(erro => console.warn(erro));
    };


    componentDidMount() {
        this._carregarPorNome();
    }

    render() {
        return (
            <View style={{ backgroundColor: 'black', height: "100%" }}>
                <StatusBar backgroundColor="black" />
                <Text style={styles.Titulo}>Buscar Por Nome</Text>
                {/* style={{ color: "white" }} */}
                <TextInput
                    placeholder="Nome do Filme"
                    onChangeText={nome => this.setState({ nome })}
                    value={this.state.nome}
                    style={styles.input}
                />
                <TouchableOpacity style={{ width: '20%', marginTop: '-12%', marginLeft: '65%', backgroundColor: 'grey', height: 50, borderBottomRightRadius: 15, borderTopRightRadius: 15, }} onPress={alert(this.state.nome)}>
                    <Text style={{ color: 'white', marginTop: '17%', textAlign: 'center' }}>Enviar</Text>
                </TouchableOpacity>
                <FlatList
                    style={styles.lista}
                    data={this.state.lancamento}
                    keyExtractor={item => item.idLancamentos}
                    renderItem={({ item }) => (
                        <View>
                            <Text style={{ color: 'black' }}>{item.nome} - {item.dataLancamento}</Text>
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
        color: "white",
        fontSize: 25,
        marginTop: '10%',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: "white",
        marginLeft: '15%',
        width: '45%',
        marginTop: '10%',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        borderColor: 'white',
        borderStyle: 'solid',
        color: 'black',
        fontSize: 20
    },
    lista: {
        backgroundColor: '#1a1a1a',
        marginLeft: '15%',
        width: '70%',
        marginTop: '10%',
        marginBottom: '15%',
        borderRadius: 15
    }
})

export default nome;