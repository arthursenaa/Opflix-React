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
            lancamento: []
        };
    }


    _carregarFilmes = async () => {
        await fetch('http://192.168.6.115:5000/api/lancamento', {
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
            <View >
                {/* style={{ backgroundColor: 'black', height: "100%" }} */}
                <StatusBar backgroundColor="black" />
                <Text >Main</Text>
                {/* style={{ color: "white" }} */}
                <FlatList
                    data={this.state.lancamento}
                    keyExtractor={item => item.IdLancamentos}
                    renderItem={({ item }) => (
                        <View>
                            <Text >{item.Nome}</Text>
                            <Text >{item.DataLancamento}</Text>
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

export default filtro;