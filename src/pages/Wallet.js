import React from 'react';
import { Component } from 'react/cjs/react.production.min';
import Header from './Header';

export default class Wallet extends Component {
  render() {
    return (
      <>
        <div>
          {' '}
          <Header />
        </div>
        <div>TrybeWallet</div>
      </>
    );
  }
}
