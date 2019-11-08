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
    constructor() {
        super();
        this.state = {
            nome: null,
            email: null,
            senha: null,
            senha1: null,
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

        } else {
            this.setState({ erro: "As Senhas Digitadas Estão Diferentes" })
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: 'black', height: "100%" }}>
                <StatusBar backgroundColor="black" />
                <Image
                    source={require('../assets/img/logo.png')}
                    style={{ alignSelf: 'center', marginTop: 75 }}
                />
                <TextInput
                    placeholder="      Nome"
                    onChangeText={nome => this.setState({ nome })}
                    value={this.state.nome}

                />
                <TextInput
                    placeholder="      Email"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}

                />
                <TextInput
                    placeholder="      Senha"
                    onChangeText={senha => this.setState({ senha })}
                    value={this.state.senha}
                />
                <TextInput
                    placeholder="      Confirmar Senha"
                    onChangeText={senha1 => this.setState({ senha1 })}
                    value={this.state.senha1}
                />
                <TouchableOpacity onPress={this._fazerCadastro} >
                    <Text style={{ color: 'white', marginTop: '3%' }}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
//#282c34
const styles = StyleSheet.create({

});

export default cadastrar;
