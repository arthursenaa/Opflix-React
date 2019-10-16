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
            filmes: [],
            id: "",
            sinopse: "",
            generoNome: [],
            generos: []
        }
    }

    //Tabela Filme
    listarFilme = () => {
        fetch('http://localhost:5000/api/lancamento', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("usuario-opflix"),
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => this.setState({ filmes: data }));
    }

    componentDidMount() {
        this.listarFilme();
    }


    render() {
        return (
            <div style={{ backgroundColor: "#1C1C1C" }}>
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
                                    {/* <th>Genero</th> */}
                                    <th>Tipo</th>
                                    <th>Classificação</th>
                                    <th>Sinopse</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.filmes.map(element => {
                                    return (
                                        <tr key={element.idLancamentos}>
                                            <td>{element.idLancamentos}</td>
                                            <td>{element.nome}</td>
                                            <td>{element.duracao}</td>
                                            {/* <td>{element.idGeneroNavigation.nome}</td> */}
                                            <td>{element.idTipoNavigation.tipo1}</td>
                                            <td>{element.classificacaoIndicativa}</td>
                                            <td>{element.sinopse}</td>
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
