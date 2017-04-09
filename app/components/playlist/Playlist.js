import React from 'react';
import SongsComp from '../songs/SongsComp';
import './playlist.scss';

export default class Playlist extends React.Component{
  constructor() {
    super();
    this.state = {
          }
  }

  componentDidUpdate(){
    if(this.props.playlist.isFocusMode){
      this.inputElm.focus();
    }
  }

  handleChange(event){
    this.props.changeListTitle(event.target.value, this.props.index)
  }

  toggleListTitleView(){
    if(this.props.playlist.isFocusMode){
      return <input type="text"
                    ref={(value)=> this.inputElm= value }
                    onBlur={()=> this.props.updateEditModePlaylist(this.props.index)}
                    onKeyDown={(charCode)=> {if(charCode === 13)
        return this.props.updateEditModePlaylist(this.props.index)}}
                    onChange={ this.handleChange }
                    value={ this.props.playlist.title }/>
    }
    else{
      return <h2 onClick={ this.props.updateEditModePlaylist }>{this.props.playlist.title}</h2>
    }

  }


  render(){
    const length = this.props.playlist.songs.length;
    return(
      <div className="playlist-comp">
        <div className="playlist-title">
          { this.toggleListTitleView() }
          <span className="num-songs-in-list">{ this.props.playlist.songs.length}</span>
          <button type="button" className="delete-list-btn" onClick={ ()=> this.props.deletePlaylist(this.props.index) }>Delete</button>
        </div>
<div className="list-songs">
  {
    length>0  && <SongsComp
      songs={ this.props.playlist.songs }
      updateCurrentTrack={ this.props.updateCurrentTrack }
      createNewPlaylist={ this.props.createNewPlaylist }
      mode={ 'playlist'}
      playlist={ this.props.playlist }
      playlists={ this.props.playlists }
      // updateSelectedSong={ props.updateSelectedSong }
    />
  }
</div>

      </div>
    );
}
}

