import React, { Component } from 'react';
import logo from '../../assets/img/Capturar.png';
import Menu from '../../componentes/Menu.js';
import Axios from 'axios';

import { Accordion, Card, Button, Table } from 'react-bootstrap';
import './Filmes.css';
import { parseJwt } from '../../services/auth';




export default class Filmes extends Component {
    constructor() {
        super();
        this.state = {
            filmes: [],
            ultimos: [],
            antigos: [],
            generos: [],
            filmeGenero: [],
            idgenero: "",
            permissao: parseJwt().permissao
            // sinopse: "",
            // generoNome: [],
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

    // listar5
    ultimosLancamentos = () => {
        fetch('http://localhost:5000/api/lancamento/datad', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("usuario-opflix"),
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => this.setState({ ultimos: data }));
    }
    //MaisAntigos
    maisAntigos = () => {
        fetch('http://localhost:5000/api/lancamento/datac', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("usuario-opflix"),
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => this.setState({ antigos: data }));
        // console.log(this.state.antigos)
    }
    //Por Genero
    listarGenero = () => {
        // eventDefault();
        fetch('http://localhost:5000/api/categoria', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("usuario-opflix"),
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => this.setState({ generos: data }));
    }

    componentDidMount() {
        this.listarFilme();
        this.ultimosLancamentos();
        this.maisAntigos();
        this.listarGenero();
    }


    render() {
        return (
            <div style={{ backgroundColor: "#1C1C1C"}}>
                <Menu />
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div className="divFilme">
                    <Accordion defaultActiveKey="0">
                        <Card>
                            <Card.Header  style={{backgroundColor:"Black"}}>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0" style={{color:"white"}}>
                                    Listar Filmes
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
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
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <br></br>
                        <br></br>
                        <br></br>
                        <Card>
                            <Card.Header style={{backgroundColor:"Black"}}>
                                <Accordion.Toggle as={Button} variant="link" eventKey="1" style={{color:"white"}}>
                                    Ultimos Lançamentos
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <div id="Ultimos">
                                        {/* UltimosLancamentos */}
                                        <Table striped bordered hover variant="dark">
                                            <thead>

                                                <tr>
                                                    <th>#</th>
                                                    <th>Filme</th>
                                                    <th>Duração</th>
                                                    {/* <th>Genero</th> */}
                                                    {/* <th>Tipo</th> */}
                                                    <th>Classificação</th>
                                                    <th>Sinopse</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.ultimos.map(element => {
                                                    return (
                                                        <tr key={element.idLancamentos}>
                                                            <td>{element.idLancamentos}</td>
                                                            <td>{element.nome}</td>
                                                            <td>{element.duracao}</td>
                                                            {/* <td>{element.idGeneroNavigation.nome}</td> */}
                                                            {/* <td>{element.idTipoNavigation.tipo1}</td> */}
                                                            <td>{element.classificacaoIndicativa}</td>
                                                            <td>{element.sinopse}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </Table>
                                    </div>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <br></br>
                        <br></br>
                        <br></br>
                        <Card>
                            <Card.Header style={{backgroundColor:"Black"}}>
                                <Accordion.Toggle as={Button} variant="link" eventKey="2" style={{color:"white"}}>
                                    Mais Antigos
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                    {/* //MaisAntigos */}
                                    <div id="Antigos">
                                        <Table striped bordered hover variant="dark">
                                            <thead>

                                                <tr>
                                                    <th>#</th>
                                                    <th>Filme</th>
                                                    <th>Duração</th>
                                                    {/* <th>Genero</th> */}
                                                    {/* <th>Tipo</th> */}
                                                    <th>Classificação</th>
                                                    <th>Sinopse</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.antigos.map(element => {
                                                    return (
                                                        <tr key={element.idLancamentos}>
                                                            <td>{element.idLancamentos}</td>
                                                            <td>{element.nome}</td>
                                                            <td>{element.duracao}</td>
                                                            {/* <td>{element.idGeneroNavigation.nome}</td> */}
                                                            {/* <td>{element.idTipoNavigation.tipo1}</td> */}
                                                            <td>{element.classificacaoIndicativa}</td>
                                                            <td>{element.sinopse}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </Table>
                                    </div>

                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <br></br>
                        <br></br>
                        <br></br>
                        <Card>
                            <Card.Header  style={{backgroundColor:"Black"}}>
                                <Accordion.Toggle as={Button} variant="link" eventKey="4" style={{color:"white"}}>
                                    Listar Por Genero
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="4">
                                <Card.Body>
                                    <div id="Filmes">                                  
                                        <Table striped bordered hover variant="dark">
                                            <thead>       
                                                <select onchange="listarGenero()">
                                                    {this.state.generos.map(element =>{
                                                        return(
                                                            <option>{element.nome}</option> 
                                                        );
                                                    })}
                                                </select>
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
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>











                    <br></br>
                </div>
            </div>
        );
    }
}
