import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from "react-router";
import LogIn from './components/LogIn';
import Welcome from './components/Welcome';
import Signup from './components/SignUp';
import DadJokes from './components/DadJokes';
import { NavLink } from "react-router-dom";

class App extends Component {

  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    localStorage.setItem('username', this.state.username)
    window.location.reload();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NavLink to='/'>
            <img src={logo} className="App-logo" alt="logo" />
          </NavLink>
          <div className="login-container">
            <div className="login-box">
              <Route path='/' exact render={() => <Welcome />} />
              <Route path='/signup' render={() => <Signup />} />
              <Route path='/login' render={props => <LogIn {...props} />} />
              <Route path='/users' render={() => <DadJokes />} />
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;