import PropTypes from "prop-types"
import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react/cjs/react.production.min';
import { expenseAction } from '../actions';
import Header from './Header';

class Wallet extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: [],
      method: '',
      tag: '',
      exchangeRates: '',
    };
  }

  onExpense = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  addExpense = () => {
    const { setExpense } = this.props;
    setExpense(this.state);
    this.setState({
      description: '',
      method: '',
      tag: '',
      value: '',
    });
    document.querySelectorAll('input[type=text]').forEach((element) => {
      element.value = '';
    });
  };

  getCurrencies = async () => {
    const curr = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(curr);
    const json = await response.json();
    const rates = await Object.values(json).map((el) => ({
      code: el.code,
      name: el.name,
      ask: el.ask,
    }));
    // console.log(rates);
    this.setState({
      currency: json,
      exchangeRates: rates,
    });
  }

  componentDidMount = () => {
    this.getCurrencies();
  };

  render() {
    const { method, tag, currency } = this.state;
    // console.log(expenses);

    return (
      <div className="wallet">
        <Header />
        <h2>TrybeWallet</h2>
        <section className="wallet-inputs">
          Despesa:
          <input
            name="value"
            type="text"
            onChange={ this.onExpense }
            data-testid="value-input"
          />
          Descrição da Despesa:
          <input
            name="description"
            type="text"
            onChange={ this.onExpense }
            data-testid="description-input"
          />
          <label htmlFor="currency-input">
            moeda
            <select
              name="currencyCoin"
              type="text"
              onChange={ this.onExpense }
              data-testid="currency-input"
              id="currency-input"
            >
              {
                Object.keys(currency).filter((el) => el !== 'USDT')
                  .map((dropdown, index) => (
                    <option
                      key={ dropdown + index }
                      value={ dropdown }
                      data-testid={ dropdown }
                    >
                      {dropdown}
                    </option>))
              }
            </select>
          </label>
          <label htmlFor="method-input">
            Método de Pagamento:
            <select
              name="method"
              value={ method }
              onChange={ this.onExpense }
              data-testid="method-input"
              id="method-input"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de Débito">Cartão de débito</option>
              <option value="Cartão de Crédito">Cartão de crédito</option>
            </select>
          </label>
          Categoria da Despesa:
          <select
            name="tag"
            value={ tag }
            onChange={ this.onExpense }
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </section>
        <button
          type="button"
          onClick={ () => {
            this.addExpense();
            this.setState((prevState) => ({
              id: prevState.id + 1,
            }));
          } }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setExpense: (payload) => dispatch(expenseAction(payload)),
});

export default connect(null, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  setExpense: PropTypes.func
}.isRequired;
