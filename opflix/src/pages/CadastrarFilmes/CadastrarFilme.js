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
            erro: ""
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

    cadastrarFilme = (event) => {
        event.preventDefault();
        if (this.state.senha === this.state.senha1) {
            //Erro 401
            Axios.post("http://localhost:5000/api/lancamento", {
                nome: this.state.nome,
                sinopse: this.state.sinopse,
                duracao: this.state.duracao,
                lancamentoData: this.state.lancamentoData,
                idPlataforma: this.state.idPlataforma,
                idTipo: this.state.idTipo,
                IdGenero: this.state.IdGenero,
                Classificacao: this.state.Classificacao,
            }) 
                .then(response => this.listarCategoria())
                .catch(erro => console.log(erro));
                this.setState({ sucesso: "Filme Cadastrado" })

        } else {
            this.setState({ erro: "Erro Ao cadastrar" })
        }
    }

    render() {
        return (
            <div className="divCadastro">
                <nav className="Nav">
                    <h1 style={{ color: "red", fontFamily: "Cooper", fontSize: "2.5em" }} className="h1"><a href="/" style={{ textDecoration: "none", color: "red" }}>OpFlix</a></h1>
                </nav>
                <div className="divForm" style={{marginTop:"1.2em"}}>


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
                                maxLength="255"
                                onChange={this.cadastrarSinopse}
                                value={this.state.sinopse}
                                style={{width:"153%" , marginLeft:"-26%"}}
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
                        <div className="item">
                            <input
                                className="input__login"
                                placeholder=" Data de Lançamento"
                                type="text"
                                name="password"
                                id="login__password"
                                onChange={this.cadastroClassificacao}
                                value={this.state.Classificacao}
                            />
                        </div>
                        <br></br>

                        {/* tresto */}
                        <div className="item">
                            <input
                                className="input__login"
                                placeholder="Classificaçao Indicativa"
                                type="date"
                                name="password"
                                id="login__password"
                                onChange={this.cadastroData}
                                value={this.state.lancamentoData}
                            />
                        </div>
                        <br></br>
                        <div className="item">
                            <input
                                className="input__login"
                                placeholder=" Data de Lançamento"
                                type="date"
                                name="password"
                                id="login__password"
                                onChange={this.cadastroData}
                                value={this.state.lancamentoData}
                            />
                        </div>
                        <br></br>
                        <div className="item">

                            <button className="btn btn__login" id="btn__login" style={{ backgroundcolor: "red" }}>
                                Enviar
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