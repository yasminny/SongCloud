import React from 'react';
import SongCard from './SongCard';
import Topbar from './Topbar';
import Player from './Player';

export default class Explore extends React.Component {
  constructor() {
    super();
    this.state = {
      countdownTillLoading: 5,
      songs: [],
      songsLoading: 'loading'
    };
  }

  componentDidMount() {
    this.loadSongs();
  }

  loadSongs(){
    this.setState({ songsLoading: 'loading'});
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://create-bootcamp-songcloud-server.now.sh/tracks?genre=trance');
    xhr.addEventListener('load', () => {
      this.setState({songs: JSON.parse(xhr.responseText), songsLoading: 'loaded'});
    });
    xhr.addEventListener('error', () => {
      this.waitForLoading();
      this.setState({songsLoading: 'error'});
    });
    xhr.send();
  }

  waitForLoading() {
    setTimeout(() => {
      this.setState({ countdownTillLoading: this.state.countdownTillLoading - 1});
      if (this.state.countdownTillLoading === 0) {
        this.setState({countdownTillLoading: 5});
        this.loadSongs();
      }
      else {
        this.waitForLoading();
      }
    }, 1000);
  }

  render() {
    switch (this.state.songsLoading) {
      case 'loading':
        return <div>Loading...</div>;
      case 'error':
        return <div>Error! please <button type="button" onClick={ () => this.waitForLoading() }>try again</button>, or wait {this.state.countdownTillLoading} seconds</div>;
      case 'loaded':
        return (
          <div className="explore-comp">
            <Topbar/>
            <ul className="categories">
              <li>category</li>
              <li>category</li>
              <li>category</li>
              <li>category</li>
              <li>category</li>
              <li>category</li>
            </ul>
            <ul className="songs">
            {
              this.state.songs.map((song, i) => <li  key={ song.id }>
                <SongCard
                  title={ song.title.slice(0, 30) }
                  duration={ song.duration }
                  artwork_url={ song.artwork_url }
                />
                </li>
                )}
          </ul>
            <div className="page-num">
              <button type="button" className="back">previous</button>
              <p>page number</p>
              <button type="button" className="next">next</button>
            </div>
            <Player/>
          </div>
        );
    }
  }}
