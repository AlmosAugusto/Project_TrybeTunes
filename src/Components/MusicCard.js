import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      isFavoriteChecked: false,
    };
  }

  handleChange = async () => {
    this.setState({
      loading: true,
      isFavoriteChecked: true,
    });
    await addSong();
    this.setState({ loading: false });
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
                name="favoriteSong"
                checked={ isFavoriteChecked }
                onChange={ () => { this.handleChange(); } }
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
