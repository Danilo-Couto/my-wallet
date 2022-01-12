import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react/cjs/react.production.min';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      totalAmount: '',
    };
  }

  /*   calcAmount = () => {
    const { expense } = this.props;
    const arrayAmount = expense.map((el) => el.value);
    const amount = arrayAmount.reduce((pre, curr) => Number(pre) + Number(curr));

    this.setState({
      totalAmount: amount,
    });
  }

  componentDidUpdate = () => {
    this.calcAmount();
  } */

  render() {
    const { loginUser } = this.props;
    const { totalAmount } = this.state;

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
            {totalAmount}
          </h4>
          <h4 data-testid="header-currency-field">câmbio:BRL</h4>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loginUser: state.user.email,
  expense: state.wallet.expenses,
});

Header.propTypes = {
  expense: PropTypes.shape({
    map: PropTypes.func,
  }),
  loginUser: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
