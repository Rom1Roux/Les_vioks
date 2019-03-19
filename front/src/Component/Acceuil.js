import React, { Component } from 'react';
import SignUp from './SignUp';
import LogIn from './LogIn'
import { BrowserRouter, Switch, Route, NavLink} from 'react-router-dom';
import User from './User'

class Acceuil extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {      
        return (
            <div>
                <BrowserRouter>
                    <div className="App">
                        <header className="App-header">
                            <div className="navBar">
                                <NavLink activeClassName="btnRed" className="btn btn-light" to="/signup"> Inscription </NavLink>
                                <NavLink activeClassName="btnRed" className="btn btn-light" exact to="/login"> Connection </NavLink>
                            </div>
                            <div><h1>Bienvenue chez les Vioks</h1></div>
                        </header>
                        <div>
                            <Switch>
                                <Route path="/signup" component={SignUp} />
                                <Route exact path="/login" component={LogIn} />
                                <Route exact path="/user" component={User} />
                            </Switch>
                        </div>
                    </div>
                </BrowserRouter>            
           </div>
        )
    }
}
export default Acceuil;