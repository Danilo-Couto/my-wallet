import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react/cjs/react.production.min';
import { loginAction } from '../actions';
import './login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
    };
  }

  submitLogin = () => {
    const { history, setLogin } = this.props;
    const { email } = this.state;
    setLogin(email);
    history.push('/carteira');
    this.setState({
      email: '',
    });
  };

  emailValid = () => {
    const { email } = this.state;
    const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (regex.test(email)) {
      return true;
    }
    return false;
  }

  render() {
    const { senha } = this.state;
    const minLengthPass = 6;

    const enabled = this.emailValid()
    && senha.length >= minLengthPass;

    return (
      <div className="main">
        <h3 className="sign">Login</h3>
        <section className="form1">
          <input
            className="email"
            type="email"
            onChange={ (e) => this.setState({ email: e.target.value }) }
            placeholder="exemplo@exemplo.com"
            data-testid="email-input"
            required
          />
          <input
            className="pass"
            type="password"
            onChange={ (e) => this.setState({ senha: e.target.value }) }
            placeholder="Senha"
            data-testid="password-input"
            required
            minLength={ 6 }
          />
        </section>
        <div>
          <button
            className="button"
            type="button"
            disabled={ !enabled }
            onClick={ this.submitLogin }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  setRegister: PropTypes.func,
}.isrequired;

const mapDispatchToProps = (dispatch) => ({
  setLogin: (payload) => dispatch(loginAction(payload)),
});

export default connect(null, mapDispatchToProps)(Login);

// email validation regex: https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
