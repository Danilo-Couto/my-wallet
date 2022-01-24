import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react/cjs/react.production.min';
import './header.css';

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
        <header className="header-main">
          <h4 data-testid="email-field">
            {loginUser}
          </h4>
          <div>
            <h2 data-testid="total-field">
              {this.calcAmount()}
            </h2>
            <h4 data-testid="header-currency-field">BRL</h4>
          </div>
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
