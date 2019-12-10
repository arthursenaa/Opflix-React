import React, { Component } from "react";
import { Accordion, Card, Button, Table, ButtonToolbar } from 'react-bootstrap';
import Menu from '../../componentes/Menu.js';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
// import Marker from 'google-map-react';
// import Marker from '../../assets/img/marker.png';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const PinMarker = ({ Key }) =>
    <div className="pin">
        <img scr={Marker} alt="MArker" className="Marker" />
        <p className="Titulo do Lancamento">{Key}</p>
    </div>


class Mapa extends Component {

    constructor(props) {
        super(props);
        this.state = {
            local: [],
            centro: {
                lat: -23.4549645,
                lng: -46.6960216
            },
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

    displayMarkers = () => {
        return this.state.local.map((element, index) => {
            return <Marker key={index} id={element.nome} position={{
                lat: element.latitude,
                lng: element.longitude
            }}
                onClick={() => console.log("You clicked me!")} />
        })
    }

    render() {
        return (
            <div style={{ backgroundColor: "#1C1C1C" }}>

                <Menu />
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div >
                    <div style={{ height: '82vh', marginLeft: "8%", marginRight: "8%", borderWidth: 15, border: "solid", borderColor: "Grey" }}>
                        <Map
                            google={this.props.google}
                            zoom={8}
                            initialCenter={{ lat: 47.444, lng: -122.176 }}
                            style={{width:"83.59%", height: '81.2vh'}}
                        >
                            {this.displayMarkers()}
                        </Map>
                    </div>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <div style={{ marginLeft: "8%", marginRight: "8%", minHeight: "84.2vh" }}>
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

export default GoogleApiWrapper({

})(Mapa);