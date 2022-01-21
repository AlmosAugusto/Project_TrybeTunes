import React from 'react';
import Header from '../Components/Header';

export default class Search extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <p data-testid="page-search" />
      </div>
    );
  }
}
