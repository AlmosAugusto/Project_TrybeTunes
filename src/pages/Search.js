/* eslint-disable no-spaced-func */
import React from 'react';
import Header from '../Components/Header';

const MIN_CHARINSEARCH = 2;
export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchMusic: '',
      isSearchButtonDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { searchMusic } = this.state;
    this.setState({ searchMusic: event.target.value });
    if (searchMusic.length + 1 >= MIN_CHARINSEARCH) {
      this.setState({ isSearchButtonDisabled: false });
    }
  }

  render() {
    const { searchMusic, isSearchButtonDisabled } = this.state;
    return (
      <div>
        <Header />
        <p data-testid="page-search" />
        <form>
          <label htmlFor="Search">
            <input
              type="text"
              name="Search"
              value={ searchMusic }
              data-testid="search-artist-input"
              onChange={ this.handleChange }
            />
          </label>
          <input
            type="submit"
            value="Pesquisar"
            data-testid="search-artist-button"
            disabled={ isSearchButtonDisabled }
            onClick={ this.handleClick }
          />
        </form>
      </div>
    );
  }
}
