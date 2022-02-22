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
    };
  }

  componentDidMount() {
    this.getFavoriteFunc();
  }

    getFavoriteFunc = async () => {
      const { song } = this.props;
      this.setState({ loading: true });
      const listOfFavoriteSongs = await getFavoriteSongs();
      /* console.log(listOfFavoriteSongs); */
      const isFavorited = listOfFavoriteSongs.find(
        (favoritedSong) => favoritedSong.trackId === song.trackId,
      );
      this.setState({
        isFavoriteChecked: isFavorited,
        loading: false,
      });
    };

  /* Consultei o rep do Antonio Sabino da turma 17 para  concluir esse requisito --> https://github.com/tryber/sd-017-project-trybetunes/pull/151/files */
  handleChange = async ({ target }) => {
    const { checked } = target;
    const { song, update } = this.props;
    this.setState({
      loading: true,
      isFavoriteChecked: checked,
    });
    if (checked === true) {
      await addSong(song);
      this.setState({ loading: false });
    } else {
      await removeSong(song);
      this.setState({ loading: false }, update);
    }
  }

  render() {
    const { previewUrl, songTitle, trackId } = this.props;
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
                id="favoriteSong"
                checked={ isFavoriteChecked }
                onChange={ this.handleChange }
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
