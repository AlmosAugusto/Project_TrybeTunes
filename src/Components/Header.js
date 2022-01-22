import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      name: '',
    };
  }

  componentDidMount() {
    this.getApi();
  }

  async getApi() {
    const userName = await getUser();/* a função getUser recupera o nome do usuário criado na função createUser */
    this.setState({
      loading: true,
      name: userName.name,
    });
    return userName;
  }

  render() {
    const { loading, name } = this.state;
    return (
      <header data-testid="header-component">
        <h2 data-testid="header-user-name">
          {loading ? name : <Loading /> }
        </h2>
        <Link
          data-testid="link-to-search"
          to="/search"
          id="toSearch"
        >
          Procurar
        </Link>
        <Link
          data-testid="link-to-favorites"
          to="/favorites"
          id="toFavorites"
        >
          Favoritos
        </Link>
        <Link
          data-testid="link-to-profile"
          to="/profile"
          id="toProfile"
        >
          Perfil
        </Link>
      </header>
    );
  }
}
