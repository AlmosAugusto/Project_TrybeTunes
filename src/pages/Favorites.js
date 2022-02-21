import React from 'react';
import Header from '../Components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      /* loading: false,
      isFavoriteChecked: false,
      favoriteSongs: [], */
    };
  }

  componentDidMount() {
    this.getFavoriteFunc();
  }

  getFavoriteFunc = async () => {
    const listOfFavoriteSongs = await getFavoriteSongs();
    console.log(listOfFavoriteSongs);
  }

  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
      </div>
    );
  }
}
