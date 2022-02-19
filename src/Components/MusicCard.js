import React from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends React.Component {
  render() {
    const { previewUrl, songTitle } = this.props;
    return (
      <div>
        <h3>
          { songTitle }
        </h3>
        {/* Codigo ja montado na descrição do requisito 7 */}
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}
MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  songTitle: PropTypes.string,
}.isRequired;
