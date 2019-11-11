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
            lancamento: []
        };
    }


    _carregarFilmes = async (AsyncStorage) => {
        await fetch('http://192.168.6.115:5000/api/lancamento', {
            headers: {
                'Authorization': 'Bearer ' + AsyncStorage.getItem('@opflix:token'),
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
            <View style={{ backgroundColor: 'grey', height: "100%"}}>
                
                <StatusBar backgroundColor="black" />
                <Text style={{ color: "white" }} >Main</Text>
                
                <FlatList
                    data={this.state.lancamento}
                    keyExtractor={item => item.idLancamentos}
                    renderItem={({item}) => (
                        <View>
                            <Text >{item.nome - item.dataLancamento}</Text>
                            {/* <Text style={{ color: "white" }}>{item.dataLancamento}</Text> */}
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
    }
})

export default main;