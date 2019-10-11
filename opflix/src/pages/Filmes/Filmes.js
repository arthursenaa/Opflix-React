import React, { Component } from 'react';
import logo from '../../assets/img/Capturar.png';
import Menu from '../../componentes/Menu.js';
import Axios from 'axios';

import Table from 'react-bootstrap/Table'
import './Filmes.css';




export default class Filmes extends Component {
    constructor() {
        super();
        this.state = {
            filmes: [ ],
            id: ""
        }
    }
    //Tabela Filme
    listarFilme = () => {
        
        Axios.get('http://localhost:5000/api/lancamento')
            .then(response => {
                this.setState({lista: response.data})
            })

        // fetch('http://localhost:5000/api/lancamento')
        //     .then(response => response.json())
        //     .then(data => this.setState({ filmes: data}));
            
        console.log(this.state.filmes)
    }

    componentDidMount() {
        this.listarFilme();
    }



    render() {
        return (
            <div style={{backgroundColor:"#1C1C1C"}}>
                <Menu />
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div className="divFilme">
                    <div id="Filmes">
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Filme</th>
                                    <th>Duração</th>
                                    <th>Genero</th>
                                    <th>Plataforma</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.filmes.map(element => {   
                                    console.log(this.state.filmes)
                                    return (
                                        <tr key={element.idLancamentos}>
                                            <td>{element.nome}</td>
                                            <td>{element.duracao}</td>
                                            <td>{element.genero.nome}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </div>

                </div>
            </div>
        );
    }
}
