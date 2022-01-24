import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editBtnAction, formEditToFalseAction } from '../actions';
import './editable.css';

class EditableTable extends Component {
  constructor() {
    super();
    this.state = {};
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

    render() {
      const { method, tag, exchangeRates } = this.state;
      const { editLineTable, objectToBeEdit, setFormEditFalse } = this.props;

      return (
        <div className="editable-main">
          <h4>EDITANDO INFORMAÇÕES</h4>
          <section className="editable-table">
            Valor:
            <input
              className="editable-imputs"
              name="value"
              type="text"
              onChange={ this.onExpense }
            />
            Descrição da Despesa:
            <input
              className="editable-imputs"
              name="description"
              type="text"
              onChange={ this.onExpense }
            />
            <label htmlFor="currency">
              moeda
              <select
                name="currency"
                type="text"
                onChange={ this.onExpense }
              >
                {exchangeRates && Object.keys(exchangeRates).filter((el) => el !== 'USDT')
                  .map((dropdown, index) => (
                    <option
                      key={ dropdown + index }
                      value={ dropdown }
                    >
                      {dropdown}
                    </option>))}
              </select>
            </label>
            <label htmlFor="method">
              Método de Pagamento:
              <select
                name="method"
                value={ method }
                onChange={ this.onExpense }
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
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </section>
          <button
            className="btn-edit-exp"
            type="button"
            onClick={ () => {
              editLineTable(this.state, objectToBeEdit); setFormEditFalse();/* formEdit(); */
            } }
          >
            Editar despesa
          </button>
        </div>
      );
    }
}

const mapDispatchToProps = (dispatch) => ({
  editLineTable: (state, obj) => dispatch(editBtnAction(state, obj)),
  setFormEditFalse: () => dispatch(formEditToFalseAction()),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  formEditState: state.wallet.formEdit,
  objectToBeEdit: state.wallet.objectToBeEdit,
});

EditableTable.propTypes = {
  editLineTable: PropTypes.func,
  objectToBeEdit: PropTypes.any,
  setFormEdit: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(EditableTable);
