import React from 'react';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import MusicCard from '../Components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteSongs: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.getFavoriteFunc();
  }

  getFavoriteFunc = async () => {
    const listOfFavoriteSongs = await getFavoriteSongs();
    console.log(listOfFavoriteSongs);
    this.setState({
      favoriteSongs: listOfFavoriteSongs,
      loading: false,
    });
  }

  updateFavoriteList = () => {
    this.setState({
      loading: true,
    },
    this.getFavoriteFunc);
  }

  render() {
    const { favoriteSongs, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div>
          {loading ? <Loading /> : (
            favoriteSongs.map((song) => (
              <MusicCard
                previewUrl={ song.previewUrl }
                songTitle={ song.trackName }
                trackId={ song.trackId }
                key={ song.trackId }
                song={ song }
                update={ this.updateFavoriteList }
              />
            )))}
        </div>
      </div>
    );
  }
}
