import React from 'react';

import { Nav, Navbar, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Logo} from '../assets/img/logo.png'

function Menu() {

    return (
        <Navbar bg="dark" variant="dark" fixed="top">
            <Navbar.Brand href="/" style={{ color: "red", fontFamily: "Cooper", fontSize: "2em" }}>Opflix</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#Filmes" >Lista de Filmes</Nav.Link>
                    <Nav.Link href="#Generos" >Listar Generos</Nav.Link>
                    {/* <Nav.Link href="/Home">Pricing</Nav.Link> */}
                </Nav>
                
            </Navbar.Collapse>
        </Navbar>
    );
}
export default Menu;