
import Playlist from './Playlist';
import React from 'react';

export default class Playlists extends React.Component {
  constructor() {
    super();
    this.state = {
      countdownTillLoading: 5,
      songs: [],
      songsLoading: 'loading',
    };
  }

  componentDidMount() {
    this.loadSongs();
  }

  loadSongs(){
    // const genre = this.props.match.params.genre.toString();

    this.setState({ songsLoading: 'loading'});
    const xhr = new XMLHttpRequest();
    xhr.open('GET', ``);
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

  render(){
    switch (this.state.songsLoading) {
      case 'loading':
        return <div className="loading"><i className="fa fa-spinner fa-pulse fa-3x fa-fw"> </i></div>;
      case 'error':
        return <div>Error! please <button type="button" onClick={ () => this.waitForLoading() }>try again</button>, or wait {this.state.countdownTillLoading} seconds</div>;
      case 'loaded':
    return (
      <div>
        <aside className="sidebar">
          <button type="button" className="add-playlist-btn">Add new playlist</button>
          <ul>
            <Playlist/>
          </ul>
        </aside>
        <h1>Playlists component</h1>
        <Playlist
          songs={ this.state.songs }/>
      </div>
    );
  }

}}
