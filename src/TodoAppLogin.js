import React, { Component } from 'react'
import request from 'superagent'

export default class TodoAppLogin extends Component {

    state = {
        usernameSignIn: '',
        usernameSignUp: '',
        passwordSignIn: '',
        passwordSignUp: '',
    }

    handleSignIn = async () => {
        const signIn = await request.post(`https://secure-river-88477.herokuapp.com/api/auth/signin`, {
            usernameSignUp: this.state.usernameSignIn,
            password: this.state.passwordSignIn,
        })
        alert('you are now logged in');
        localStorage.setItem('user', JSON.stringify(signIn.body));
        this.props.history.push('/');
    }

    handleSignUp = async () => {
        const signUp = await request.post(`https://secure-river-88477.herokuapp.com/api/auth/signup`, {
            usernameSignUp: this.state.usernameSignUp,
            password: this.state.passwordSignUp,
        })
        alert('thanks for signing up!');
        localStorage.setItem('user', JSON.stringify(signUp.body));
        this.props.history.push('/');

    }

    render() {
        return (
            <div>
                <div id="welcome">Sign Up or Sign In to start tackling your To-Dos!</div>
                usernameSignUp <input value={this.state.usernameSignUp} onChange={(e) => this.setState({ usernameSignUp: e.target.value })} />
                Password: <input value={this.state.passwordSignUp} type="password" onChange={(e) => this.setState({ passwordSignUp: e.target.value })} />

                <button className="myButton" onClick={this.handleSignUp}>Sign up</button>
                <br />
                usernameSignUp: <input value={this.state.usernameSignIn} onChange={(e) => this.setState({ usernameSignIn: e.target.value })} />
                Password: <input value={this.state.passwordSignIn} type="password" onChange={(e) => this.setState({ passwordSignIn: e.target.value })} />

                <button className="myButton" onClick={this.handleSignIn}>Sign in</button>
            </div>
        )
    }
}