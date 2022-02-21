import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      isFavoriteChecked: false,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.getFavoriteFunc();
  }

    getFavoriteFunc = async () => {
      const { song } = this.props;
      this.setState({
        loading: true,
      });
      const listOfFavoriteSongs = await getFavoriteSongs();
      /* console.log(listOfFavoriteSongs); */
      this.setState({
        favoriteSongs: listOfFavoriteSongs,
        loading: false,
      }, () => {
        const { favoriteSongs } = this.state;
        /* console.log(song);
        console.log(favoriteSongs); */
        favoriteSongs.find((favoriteSong) => favoriteSong.trackId === song.trackId && (
          this.setState({ isFavoriteChecked: true })));
      });
    };

  /* Consultei o rep do Carlos Rosa da turma 17 para o requisito concluir esse requisito --> https://github.com/tryber/sd-017-project-trybetunes/pull/111/files */
  handleChange = async (event, song) => {
    this.setState({
      loading: true,
      isFavoriteChecked: event,
    });
    const isValid = (event === true) ? await addSong(song) : await removeSong(song);
    this.setState({ loading: false });
    return isValid;
  }

  render() {
    const { previewUrl, songTitle, trackId, song } = this.props;
    const { loading, isFavoriteChecked } = this.state;
    return (
      <div>
        { loading ? (<Loading />) : (
          <div>
            <h3>
              { songTitle }
            </h3>
            <label htmlFor="favoriteSong">
              Favorita
              <input
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                name="favoriteSong"
                checked={ isFavoriteChecked }
                onChange={ (event) => this.handleChange(
                  event.target.checked,
                  song,
                ) }
              />
            </label>
            {/* Codigo ja montado na descrição do requisito 7 */}
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
          </div>
        )}
      </div>

    );
  }
}
MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  songTitle: PropTypes.string,
}.isRequired;
