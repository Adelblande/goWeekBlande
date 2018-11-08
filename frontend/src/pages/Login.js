import React, { Component } from 'react';

import twitterLogo from '../../src/twitter.svg';
import './Login.css';

class Login extends Component {
  state = {
    username: ''
  }

  handleInputChange = e => {
    this.setState({ username: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault();
    const { username } = this.state;
    if(!username.length) return;
    localStorage.setItem('@goTwitter:username', username);

    this.props.history.push('/timeline');
  }
  render() {
    return(
      <div className="login-wrapper">
        <img src={twitterLogo} alt="GoTwitter" />
        <form onSubmit={this.handleSubmit}>
          <input 
            name={this.state.username} 
            placeholder="Nome de usuário" 
            onChange={this.handleInputChange}
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }
}

export default Login;