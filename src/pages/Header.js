import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react/cjs/react.production.min';

class Header extends Component {
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
            0
          </h4>
          <h4 data-testid="header-currency-field">câmbio:BRL</h4>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loginUser: state.user.email,
});

Header.propTypes = {
  userLogin: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
