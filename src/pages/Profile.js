import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import { getUser } from '../services/userAPI';

export default class profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      nome: '',
      email: '',
      description: '',
      image: '',
    };
  }

  componentDidMount() {
    this.getApi();
  }

  async getApi() {
    const profileData = await getUser();
    this.setState({
      loading: true,
      nome: profileData.name,
      email: profileData.email,
      description: profileData.description,
      image: profileData.image,
    });
    return profileData;
  }

  render() {
    const { loading, nome, email, description, image } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <img
          data-testid="profile-image"
          src={ loading ? image : <Loading /> }
          alt="Foto do Usuario"
        />
        <h4>
          { nome }
        </h4>
        <h4>
          { email }
        </h4>
        <h4>
          { description }
        </h4>
        <Link
          to="/profile/edit"
          data-testid="link-to-profileEdit"
        >
          <button type="submit">Editar perfil</button>
        </Link>
      </div>
    );
  }
}
