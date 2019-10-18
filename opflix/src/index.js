import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//paginas
import App from './pages/Home/App';
import Filmes from './pages/Filmes/Filmes';
import Cadastro from './pages/Cadastro/Cadastrar';
import ADM from './pages/Adm/Adm';
import CadastrarADM from './pages/CadastrarAdm/CadastrarAdm';

import NaoEncontrado from "./pages/NaoEncontrado/NaoEncontrado";

//rotas
import { Route, Link, BrowserRouter as Router, Switch, Redirect} from "react-router-dom";
import { parseJwt } from './services/auth';

import * as serviceWorker from './serviceWorker';
// import { parseJwt } from './services/auth';

const RotaLogin = ({component: Component}) => (
    <Route 
        render={ props =>
            localStorage.getItem("usuario-opflix") !== null  ?
            (
                <Component {...props}/>
            ) : (
                <Redirect 
                    to={{pathname: "/",state: {from: props.location}}
                }
                />
            )
        }
    />
)

const RotaPrivada = ({ component: Component}) => (
    <Route 
        render={
            props =>
               parseJwt().IdTipoUsuario === "2" ? (
                    <Component {...props} />
                ) : (
                    <Filmes {...props} />
                )
        }
    />
);

const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path='/' component={App} />
                <Route exact path='/Cadastro' component={Cadastro} />
                <RotaLogin path='/Filmes' component={Filmes} />
                <RotaPrivada path='/CadastrarADM' component={Filmes} />
                {/* <UsuarioComum path='/Filmes' component={Filmes} /> */}
                <RotaPrivada path='/Adm' component={ADM}></RotaPrivada>
                <Route component={NaoEncontrado}/>
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
