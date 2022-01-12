import PropTypes from 'prop-types';
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
      description: 'descrição',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
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
    this.getExchangeRate();
  };

  getExchangeRate = async () => {
    const curr = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(curr);
    const json = await response.json();
    this.setState({
      exchangeRates: json,
    });
  }

  componentDidMount = () => {
    this.getExchangeRate();
    // this.getCurrencies();
  };

  makeTable = () => {
    const { expenses } = this.props;
    console.log(expenses);

    return (
      <div>
        <table>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          {expenses.map((val, key) => (
            <tr key={ key }>
              <td>{val.description}</td>
              {' '}
              {/* descricao */}
              <td>{val.tag}</td>
              {' '}
              {/* tag */}
              <td>{val.method}</td>
              {' '}
              {/* metodo */}
              <td>{val.value}</td>
              {' '}
              {/* valor */}
              <td>{(val.exchangeRates[val.currency].name).split('/')[0]}</td>
              {' '}
              {/* moeda */}
              <td>{Number((val.exchangeRates[val.currency]).ask).toFixed(2)}</td>
              {' '}
              {/* cambio usado */}
              <td>{((val.value) * ((val.exchangeRates[val.currency]).ask)).toFixed(2)}</td>
              {' '}
              {/* valor convertido */}
              <td>Real</td>
              {' '}
              {/* moeda de conversao */}
              {' '}
              <td>
                <button>editar</button>
                <button>excluir</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }

  render() {
    const { method, tag, exchangeRates } = this.state;

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
              name="currency"
              type="text"
              onChange={ this.onExpense }
              data-testid="currency-input"
              id="currency-input"
            >
              {
                // arrayCurrency
                // this.getCurrencies()
                Object.keys(exchangeRates).filter((el) => el !== 'USDT')
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
              <option value="Cartão de débito">Cartão de débito</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
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
        </section>
        <section
          className="chart"
        >
          <br />
          TABELA DE GASTOS
          {this.makeTable()}
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setExpense: (payload) => dispatch(expenseAction(payload)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  setExpense: PropTypes.func,
}.isRequired;
