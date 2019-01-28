import React, { Component } from 'react';
import axios from "axios";
import { NavLink } from "react-router-dom";

export class DadJokes extends Component {

    constructor() {
        super();
        this.state = {
            jokes: [],
            authenticated: null
        };
    }
    componentDidMount() {
        const token = localStorage.getItem('jwt');
        const options = {
            headers: {
                Authorization: token
            }
        };
        if (token) {
            this.setState ({
                authenticated: true
            })
        };
        axios
            .get('http://localhost:3300/api/jokes', options)
            .then(res => {
                console.log(res.data);
                this.setState({
                    jokes: res.data
                });
            })
            .catch(err => {
                console.log(err);
            })
    }


    render() {
        return (
            <div>
                <h2 className="title">Dad Jokes</h2>
                <NavLink to='/login' style={{color: 'white', textDecoration: 'none' }}>
                    <button onClick={this.handleSignout} className={this.state.authenticated ? 'display' : 'hide' }>I'm Out</button>
                    <p className={this.state.authenticated ? 'hide' : 'display'} >You are not logged in. Please click here to log in.</p>
                </NavLink>
                <h3>
                    {this.state.jokes.map(joke => (
                        <p key={joke.id} class='joke'>{joke.joke}</p>
                    ))}
                </h3>
            </div>
        )
    }
    handleSignout = () => {
        localStorage.removeItem('jwt');
    }
}

export default DadJokes;