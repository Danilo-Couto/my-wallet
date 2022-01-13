import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react/cjs/react.production.min';

class Header extends Component {
  calcAmount = () => {
    const { expenses } = this.props;
    if (expenses) {
      const total = expenses.reduce((acc, curr) => {
        const askRate = Object.values(curr.exchangeRates)
          .find((el) => el.code === curr.currency).ask;
        return acc + (Number(askRate) * Number(curr.value));
      }, 0).toFixed(2);
      return total;
    }
    return 0;
  }

  render() {
    const { loginUser } = this.props;
    return (
      <div>
        <header>
          <h4 data-testid="email-field">
            login:
            {' '}
            {loginUser}
          </h4>
          <h4 data-testid="total-field">
            despesa:
            {this.calcAmount()}
          </h4>
          <h4 data-testid="header-currency-field">câmbio: BRL</h4>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loginUser: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  expense: PropTypes.shape({
    map: PropTypes.func,
  }),
  loginUser: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);

// contribuição na função calcAmount do Gabriel Pinheiro;
