import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//paginas
import App from './pages/Home/App';
import Filmes from './pages/Filmes/Filmes';


import NaoEncontrado from "./pages/NaoEncontrado/NaoEncontrado";

//rotas
import { Route, Link, BrowserRouter as Router, Switch, Redirect} from "react-router-dom";

import * as serviceWorker from './serviceWorker';

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

const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path='/' component={App} />
                <RotaLogin path='/Filmes' component={Filmes} />
                {/* <Route exact path='/Filmes' component={Filmes} /> */}
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
