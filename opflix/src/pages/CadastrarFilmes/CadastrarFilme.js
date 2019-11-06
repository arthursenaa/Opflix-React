import React, { Component } from 'react';
import Axios from 'axios';
// import './Cadastro.css';

export default class CadastrarFilme extends Component {


    constructor() {
        super();
        this.state = {
            nome: "",
            sinopse: "",
            duracao: "",
            lancamentoData: "",
            idPlataforma: "",
            idTipo: "",
            IdGenero: "",
            Classificacao: "",
            erro: "",
            generos: [],
            plataforma: []
        }
    }
    cadastroNome = (event) => {
        this.setState({ nome: event.target.value })
    }

    cadastrarSinopse = (event) => {
        this.setState({ sinopse: event.target.value })
    }
    cadastroDuracao = (event) => {
        this.setState({ duracao: event.target.value })
    }
    cadastroData = (event) => {
        this.setState({ lancamentoData: event.target.value })
    }
    cadastroPlataforma = (event) => {
        this.setState({ idPlataforma: event.target.value })
    }

    cadastroTipo = (event) => {
        this.setState({ idTipo: event.target.value })
    }

    cadastroGenero = (event) => {
        this.setState({ IdGenero: event.target.value })
    }

    cadastroClassificacao = (event) => {
        this.setState({ Classificacao: event.target.value })
    }
    cadastrolancamentoData = (event) => {
        this.setState({ lancamentoData: event.target.value })
    }

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
    listarPlataforma = () => {
        // eventDefault();
        fetch('http://localhost:5000/api/plataforma', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("usuario-opflix"),
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => this.setState({ plataforma: data }));
    }

    cadastrarFilme = (event) => {
        event.preventDefault()
            Axios.Post("http://localhost:5000/api/lancamento", {
                nome: this.state.nome,//Ok
                sinopse: this.state.sinopse,//Ok
                duracao: this.state.duracao,//Ok
                lancamentoData: this.state.lancamentoData,//Ok
                idPlataforma: this.state.idPlataforma,//ok
                idTipo: this.state.idTipo,
                IdGenero: this.state.IdGenero,//Ok sem teste
                Classificacao: this.state.Classificacao,//Ok sem teste
            })
                // .then(response => this.listarCategoria())
                .catch(erro => console.log(erro));
            this.setState({ sucesso: "Filme Cadastrado" })
    }

    componentDidMount(){
        this.listarGenero();
        this.listarPlataforma();
    }

    render() {
        return (
            <div className="divCadastro">
                <nav className="Nav">
                    <h1 style={{ color: "red", fontFamily: "Cooper", fontSize: "2.5em" }} className="h1"><a href="/" style={{ textDecoration: "none", color: "red" }}>OpFlix</a></h1>
                </nav>
                <div className="divForm" style={{ marginTop: "1.2em" }}>


                    <form method="POST" onSubmit={this.cadastrarAdm}>
                        <h1>Cadastrar Filme</h1>

                        <div className="item">
                            <input
                                className="input__login"
                                placeholder="Nome"
                                type="text"
                                name="name"
                                id="login__nome"
                                onChange={this.cadastroNome}
                                value={this.state.nome}
                            />
                        </div>
                        <br></br>
                        <div className="item">
                            <textarea
                                placeholder="Sinopse"
                                type="text"
                                maxLength="455"
                                onChange={this.cadastrarSinopse}
                                value={this.state.sinopse}
                                style={{ width: "153%", marginLeft: "-26%" }}
                            />
                        </div>
                        <br></br>
                        <div className="item">
                            <input
                                className="input__login"
                                placeholder="Duracao"
                                id="login__password"
                                onChange={this.cadastroDuracao}
                                value={this.state.duracao}
                            />
                        </div>
                        <br></br>
                        <label style={{ fontSize: "85%", marginLeft: "-40%" }}>Data de Lançamento:</label>
                        <div className="item">
                            <input
                                className="input__login"
                                placeholder=" Data de Lançamento"
                                type="date"
                                name="password"
                                id="login__password"
                                onChange={this.cadastrolancamentoData}
                                value={this.state.lancamentoData}
                                style={{ width: "128%", marginLeft: "-14%" }}
                            />
                        </div>
                        <br></br>
                        <div style={{ display: "flex" ,marginLeft:'-5%'}}>
                            <div className="item" >
                                <select  placeholder="Generos" style={{width:"50%",fontSize:"0.8em"}} >
                                    {this.state.generos.map(element => {
                                        return (
                                            <option onChange={this.cadastroGenero} value={this.state.IdGenero}>{element.nome}</option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="item" >
                                <select placeholder="Plataforma" style={{width:"50%",fontSize:"0.8em"}} >
                                    {this.state.plataforma.map(element => {
                                        return (
                                            <option onChange={this.cadastroPlataforma} value={this.state.idPlataforma}>{element.plataforma1}</option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="item" >
                                <select onchange="cadastroClassificacao()" placeholder="Classificação" style={{width:"100%",fontSize:"0.8em"}} >
                                    <option value={"L" === this.setState.Classificacao}>Livre</option>
                                    <option value={"13" === this.setState.Classificacao}>+10</option>
                                    <option value={"13" === this.setState.Classificacao}>+13</option>
                                    <option value={"16" === this.setState.Classificacao } >+16</option>
                                    <option value={"18" === this.setState.Classificacao }>+18</option>
                                </select>
                            </div>
                            <div className="item" >
                                <select onchange="cadastroTipo()" placeholder="Tipo" style={{width:"100%",fontSize:"0.8em"}} >
                                    <option value="1" onClick={ 1 === this.setState.idTipo}>Filme</option>
                                    <option value="2" onClick={ 2 === this.setState.idTipo}>Série</option>
                                </select>
                            </div>
                        </div>
                        <br></br>
                        <div className="item">

                            <button className="btn btn__login" id="btn__login" onClick={this.cadastrarFilme}  style={{ backgroundcolor: "red" }}>
                                Enviar
                                {console.log(this.state.IdGenero)}
                        </button >
                        </div>
                        <br></br>
                        <p
                            className="text__login"
                            style={{ color: "green", textAlign: "center", fontSize: "0.8em" }}
                        >
                            {this.state.sucesso}
                            {this.state.erro400}
                            {this.state.erro}
                        </p>
                    </form>

                </div>
            </div>
        );
    }
}