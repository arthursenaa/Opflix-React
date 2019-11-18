import React, { Component } from 'react';
import {
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


class cadastrar extends Component {
    static navigationOptions = {
        header: null,
      };
    
    constructor() {
        super();
        this.state = {
            nome: null,
            email: null,
            senha: null,
            senha1: null,
            erro: null,
            cadastrado: null,
        };
    }


    _fazerCadastro = (event) => {
        event.preventDefault();
        if (this.state.senha === this.state.senha1) {
            fetch("http://192.168.6.115:5000/api/login/cadastrar", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: this.state.nome,
                    email: this.state.email,
                    senha: this.state.senha,
                }),
            })
                .then(response => response.json())
                .catch(erro => console.log(erro));
            this.setState({ cadastrado: "Usuario Cadastrado" })
            alert("O usuario"+ this.state.nome + " foi cadastrado")
        } else {
            alert("As Senhas Digitadas Estão Diferentes" )
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: 'black', height: "100%" }}>
                <StatusBar backgroundColor="black" />
                <Image
                    source={require('../assets/img/logo.png')}
                    style={{ alignSelf: 'center', marginTop: 65 }}
                />
                <TextInput
                    placeholder="      Nome"
                    onChangeText={nome => this.setState({ nome })}
                    value={this.state.nome}
                    style={styles.input}
                />
                <TextInput
                    placeholder="      Email"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                    style={styles.input}

                />
                <TextInput
                    placeholder="      Senha"
                    onChangeText={senha => this.setState({ senha })}
                    value={this.state.senha}
                    style={styles.input}

                />
                <TextInput
                    placeholder="      Confirmar Senha"
                    onChangeText={senha1 => this.setState({ senha1 })}
                    value={this.state.senha1}
                    style={styles.input}
                />
                <TouchableOpacity onPress={this._fazerCadastro} style={styles.btn}>
                    <Text style={{ color: 'white', marginTop: '3%' }}>Cadastrar</Text>
                </TouchableOpacity>
                {/* <Text style={{ color: "red", textAlign: "center", fontSize: "0.8em" }}>{this.state.erro}</Text> */}
                {/* <Text style={{ color: "green", textAlign: "center", fontSize: "0.8em" }}>{this.state.cadastrado}</Text> */}
            </View>
        )
    }
}
//#282c34
const styles = StyleSheet.create({
    input: {
        backgroundColor: "#1a1a1a",
        marginLeft: '15%',
        width: '70%',
        marginTop: '8%',
        borderRadius: 15,
        borderColor: 'white',
        borderStyle: 'solid',
        textDecorationColor: 'white',
        color: 'white',
    },
    btn: {
        height: 30,
        width: '40%',
        marginLeft: '30%',
        backgroundColor: "#1a1a1a",
        marginTop: '15%',
        borderRadius: 15,
        alignItems: 'center',
        color: 'white',
    }
});

export default cadastrar;
