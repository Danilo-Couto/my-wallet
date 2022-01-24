import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react/cjs/react.production.min';
import { deleteBtnAction, expenseAction, formEditAction } from '../actions';
import EditableTable from './EditableTable';
import Header from './Header';
import './wallet.css';

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
  };

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
    });
    document.querySelectorAll('input[type=text]').forEach((element) => {
      element.value = '';
    });
    this.getExchangeRate();
  };

  makeTable = () => {
    const { expenses, deleteLineTable, setFormEditTrue } = this.props;
    return (
      <div>
        <table className="table">
          <thead className="thead-table">
            <tr className="tr-table">
              <th>Valor</th>
              <th>Descrição</th>
              <th>Moeda</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody className="tbody-table">
            {expenses.map((val) => (
              <tr className="tr-tbody-table" key={ val.id }>
                <td>{val.value}</td>
                <td>{val.description}</td>
                <td>{(val.exchangeRates[val.currency].name).split('/')[0]}</td>
                <td>{val.tag}</td>
                <td>{val.method}</td>
                <td>{Number((val.exchangeRates[val.currency]).ask).toFixed(2)}</td>
                <td>
                  {((val.value) * ((val.exchangeRates[val.currency]).ask))
                    .toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => setFormEditTrue(val) } // mando o val (obj a ser editado e mudo estado global do formEdit)
                  >
                    editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => deleteLineTable(val.id) }
                  >
                    excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    const { method, tag, exchangeRates } = this.state;
    const { formEdit } = this.props;

    return (
      <div className="wallet-container">
        <div>
          <Header />
        </div>
        <h2 className="title-page">TRYBEWALLET</h2>
        <section className="wallet-inputs">
          <div className="inputs-fields">
            Valor:
            <input
              name="value"
              type="text"
              onChange={ this.onExpense }
              data-testid="value-input"
              placeholder="na moeda local"
            />
          </div>
          <div className="inputs-fields">
            Descrição:
            <input
              name="description"
              type="text"
              onChange={ this.onExpense }
              data-testid="description-input"
              placeholder="da despesa"
            />
          </div>
          <label className="inputs-fields" htmlFor="currency-input">
            Moeda
            <select
              name="currency"
              type="text"
              onChange={ this.onExpense }
              data-testid="currency-input"
              id="currency-input"
            >
              {
                Object.keys(exchangeRates).filter((el) => el !== 'USDT')
                  .map((dropdown, index) => (
                    <option
                      className="inputs-fields"
                      key={ dropdown + index }
                      value={ dropdown }
                      data-testid={ dropdown }
                    >
                      {dropdown}
                    </option>))
              }
            </select>
          </label>
          <label className="inputs-fields" htmlFor="method-input">
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
          <div className="inputs-fields">
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
          </div>
          <div className="inputs-fields">
            <button
              className="btn-add-exp"
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
        </section>
        <section
          className="chart"
        >
          <br />
          {this.makeTable()}
          {/*           { value && this.makeTable()} */}
        </section>
        <div>
          {formEdit && <EditableTable />}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setExpense: (payload) => dispatch(expenseAction(payload)),
  deleteLineTable: (payload) => dispatch(deleteBtnAction(payload)),
  setFormEditTrue: (payload) => dispatch(formEditAction(payload)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  formEdit: state.wallet.formEdit,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  setExpense: PropTypes.func,
}.isRequired;
