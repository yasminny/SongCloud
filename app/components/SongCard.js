/**
 * Created by NEXUS on 29/03/2017.
 */

export default class SongCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isHeartClicked: false,
      isInPlaylist: false
    }

    this.updateClickedHeart = this.updateClickedHeart.bind(this);
    this.updateIsInPlaylist = this.updateIsInPlaylist.bind(this);

  }



  updateClickedHeart() {
    this.setState({
      isHeartClicked: !this.state.isHeartClicked
    })
  }

  updateIsInPlaylist() {
    this.setState({
      isInPlaylist: !this.state.isInPlaylist
    })
  }

  msToTime() {
    const duration = this.props.duration;
    let seconds = parseInt((duration / 1000) % 60);
    let minutes = parseInt((duration / (1000 * 60)) % 60);

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  }

  checkboxHeader() {
    if (this.props.mode === 'explore') {
      return <header className="checkbox-header">
        <p>Add to play list</p>
        <button type='button' className="create-playlist-btn">Create playlist +</button>
      </header>
    }
    else {
      return <header className="checkbox-header">
        <p>Edit Playlist</p>
      </header>
    }
  }

  createPlaylist() {
    if (this.props.playlists.length > 0) {
      return this.props.playlists.map((playlist) => {
        return <div key={ playlist.id }>
          <input type="checkbox"/>
          <p>{ playlist.title }</p>
        </div>
      })
    }
  }



  render() {
    let dropdownClassName = this.state.isHeartClicked? 'checkbox' : 'checkbox hidden';
    return (
      <div className="songcard">
        <div className="song-img" style={{'backgroundImage': `url( ${this.props.artwork_url})`}}
             onClick={() => this.props.updateCurrentTrack(this.props.song)}/>
        <div className="details">
          <h1>{this.props.title}</h1>
          <h2><i className="fa fa-clock-o" aria-hidden="true"/> {this.msToTime()}</h2>
        </div>

        <button type="button" className="add-to-list fa fa-heart-o" onClick={ this.updateClickedHeart }/>
        <div className={ dropdownClassName }>
          { this.checkboxHeader() }
          <form>
            { this.createPlaylist() }
          </form>
        </div>
      </div>
    );
  }
}
