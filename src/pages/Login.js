import React from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from '../Components/Loading';
import { createUser } from '../services/userAPI';
/* Requisito feito com a ajuda do George Lucas da sala-17 */
const MIN_CHARACTERS = 3;

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoginButtonDisabled: true,
      login: false,
      nome: '',
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    const { nome } = this.state;
    this.setState({ nome: event.target.value });
    if (nome.length + 1 >= MIN_CHARACTERS) {
      this.setState({ isLoginButtonDisabled: false });
    }
  }

  async handleClick() {
    const { nome } = this.state;
    this.setState({ loading: true });
    await createUser({ name: nome });
    this.setState({
      loading: false,
      login: true,
    });
  }

  render() {
    const { nome, loading, login, isLoginButtonDisabled } = this.state;
    return (
      <div data-testid="page-login">
        { loading ? (<Loading />) : (
          <form>
            <label htmlFor="Login">
              Login:
              <input
                type="text"
                name="Login"
                value={ nome }
                data-testid="login-name-input"
                onChange={ this.handleChange }
              />
            </label>
            <input
              type="submit"
              value="Entrar"
              data-testid="login-submit-button"
              disabled={ isLoginButtonDisabled }
              onClick={ this.handleClick }
            />
            { login ? <Redirect to="/search" /> : ''}
          </form>
        ) }

      </div>
    );
  }
}
