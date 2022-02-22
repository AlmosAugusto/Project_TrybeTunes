import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';

export default class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artistData: [],
      allSongs: [],
    };
  }

  componentDidMount() {
    this.getAlbunsSongs();
  }

  getAlbunsSongs = async () => {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    /* console.log(...data); */
    /* console.log(data.trackName); */
    this.setState({
      artistData: data[0],
      allSongs: [...data],

    });
  }

  render() {
    const { artistData, allSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h3 data-testid="artist-name">{ artistData.artistName }</h3>
        <img
          src={ artistData.artworkUrl100 }
          alt="imagem do album"
        />
        <h3 data-testid="album-name">{ artistData.collectionName }</h3>
        <div>
          {allSongs.map((song, index) => index !== 0 && (/* tem que retirar o primeiro elemento, pois as musicas começam a partir do segundo */
            <MusicCard
              previewUrl={ song.previewUrl }
              songTitle={ song.trackName }
              trackId={ song.trackId }
              key={ song.trackId }
              song={ song }
            />
          ))}
          ;
        </div>
      </div>
    );
  }
}
/* Visto na aula de Revisão do Rod */
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
