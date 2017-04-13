import './explore.scss';
import React from 'react';
import SongsComp from '../songs/SongsComp';
import {NavLink} from 'react-router-dom';


export default class Explore extends React.Component {
  constructor() {
    super();
    this.state = {
      countdownTillLoading: 5,
      songs: [],
      songsLoading: 'loading',
      offset: 0,
      limit: 15
    };
  }

  componentDidMount() {
    this.loadSongs();
  }

  nextPage() {
    this.setState({
      offset: this.state.offset + this.state.limit
    })
  }

  prevPage() {
    this.setState({
      offset: this.state.offset - this.state.limit
    })
  }

  loadSongs() {
    const genre = this.props.match.params.genre.toString();
    let offset = this.state.offset;
    let limit = this.state.limit;
    this.setState({songsLoading: 'loading'});
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.soundcloud.com/tracks?client_id=2t9loNQH90kzJcsFCODdigxfp325aq4z&limit=${limit}&offset=${offset}&tags=${genre}`);
    xhr.addEventListener('load', () => {
      this.setState({songs: JSON.parse(xhr.responseText), songsLoading: 'loaded'});
    });
    xhr.addEventListener('error', () => {
      this.waitForLoading();
      this.setState({songsLoading: 'error'});
    });
    xhr.send();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.genre !== this.props.match.params.genre) {
      this.setState({ offset: 0 }, ()=> {
        this.loadSongs();
      });
    }
    if(prevState.offset !== this.state.offset){
      this.loadSongs();
    }
    if (this.catElm){
      this.catElm.scrollIntoView();
    }

  }

  waitForLoading() {
    setTimeout(() => {
      this.setState({countdownTillLoading: this.state.countdownTillLoading - 1});
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
        return <div className="loading"><i className="fa fa-spinner fa-pulse fa-3x fa-fw"> </i></div>;
      case 'error':
        return <div>Error! please
          <button type="button" onClick={ this.waitForLoading }>try again</button>
          , or wait {this.state.countdownTillLoading} seconds</div>;
      case 'loaded':
        return (
          <div className="explore-comp">
            <ul className="categories" ref={(cat)=> this.catElm = cat }>
              <li>Genres:</li>
              <li><NavLink to="/explore/indie" activeClassName="selected-genre">Indie</NavLink></li>
              <li><NavLink to="/explore/pop" activeClassName="selected-genre">Pop</NavLink></li>
              <li><NavLink to="/explore/ambient" activeClassName="selected-genre">Ambient</NavLink></li>
              <li><NavLink to="/explore/dubstep" activeClassName="selected-genre">Dubstep</NavLink></li>
              <li><NavLink to="/explore/trance" activeClassName="selected-genre">Trance</NavLink></li>
              <li><NavLink to="/explore/house" activeClassName="selected-genre">House</NavLink></li>
            </ul>
            <div className="genre-title">
              Genre: { this.props.match.params.genre.toString().charAt(0).toUpperCase() + this.props.match.params.genre.toString().slice(1) }</div>
            <SongsComp
              songs={ this.state.songs }
              // updateCurrentTrack={ this.props.updateCurrentTrack }
              // updateSelectedSong={ this.props.updateSelectedSong }
              // updateClickedBtn={ this.props.updateClickedBtn }
              // createNewPlaylist={ this.props.createNewPlaylist }
              mode={ 'explore' }
              playlists={ this.props.playlists }
            />
            <div className="page-num">
              <button type="button" className="back" onClick={() => this.prevPage(this)}
                      disabled={this.state.offset === 0}>Prev
              </button>
              <p>page {this.state.offset / this.state.limit + 1}</p>
              <button type="button" className="next" onClick={ () => this.nextPage(this)}>Next</button>
            </div>

          </div>
        );
    }
  }
}
