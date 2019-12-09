import React, { Component } from "react";
import { Accordion, Card, Button, Table, ButtonToolbar } from 'react-bootstrap';
import Menu from '../../componentes/Menu.js';

class Mapa extends Component {

    constructor() {
        super();
        this.state = {
            local: [],
        }
    }

    listarLocalizacao = () => {

        fetch('http://192.168.6.115:5000/api/localization')
            .then(response => response.json())
            .then(data => this.setState({ local: data }))

    }

    componentDidMount() {
        this.listarLocalizacao();
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
                <div style={{ marginLeft: "8%", marginRight: "8%", minHeight: "84.2vh" }}>
                    {/* <p>{this.state.local}</p> */}
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Filme</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.local.map(element => {
                                return (
                                    <tr key={element.id}>
                                        <td>{element.nomeLancamento}</td>
                                        <td>{element.latitude}</td>
                                        <td>{element.longitude}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default Mapa;