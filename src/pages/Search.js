import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
/* Consultei o repositorio do William Alves turma 17 - https://github.com/tryber/sd-017-project-trybetunes/pull/46/files */
const MIN_CHARINSEARCH = 2;
export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      isSearchButtonDisabled: true,
      listArtist: [],
      nameArtist: '',
      loadingTxt: '',
    };
  }

  /* Retirei o bind, após mudar a função handleChange para Arro Function */
  handleChange = (event) => {
    const { artist } = this.state;
    this.setState({
      artist: event.target.value,
      nameArtist: event.target.value,
    });
    if (artist.length + 1 >= MIN_CHARINSEARCH) {
      this.setState({ isSearchButtonDisabled: false });
    }
  }

  handleClick = async (event) => {
    event.preventDefault();
    const { artist } = this.state;
    this.setState({ loadingTxt: false });
    searchAlbumsAPI(artist).then((data) => {
      this.setState({
        listArtist: data,
        loadingTxt: true,
        artist: '',
      });
    });
  };

  render() {
    const { artist, isSearchButtonDisabled,
      loadingTxt, listArtist, nameArtist } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <form>
            {loadingTxt === false ? (
              <Loading />
            ) : (
              <>
                <label htmlFor="Search">
                  <input
                    type="text"
                    name="search"
                    value={ artist }
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
              </>
            )}
          </form>
          {loadingTxt && listArtist.length === 0
            ? <h4>Nenhum álbum foi encontrado</h4> : null}
          {listArtist.length > 0 ? (
            <div>
              {<h4>{`Resultado de álbuns de: ${nameArtist}`}</h4>}
              {listArtist.map((element) => (
                <div key={ element.collectionId }>
                  {element.artistName}
                  <Link
                    data-testid={ `link-to-album-${element.collectionId}` }
                    to={ `/album/${element.collectionId}` }
                    id="toAlbum"
                  >
                    {element.collectionName}
                    <img src={ element.artworkUrl100 } alt={ element.collectionName } />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            null
          )}
        </div>
      </>
    );
  }
}
