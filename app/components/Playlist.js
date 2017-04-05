/**
 * Created by NEXUS on 03/04/2017.
 */
import SongsComp from './SongsComp';

export default class Playlist extends React.Component{
  constructor() {
    super();
    this.state = {
      isPlaylistClicked: false
    }
  }


  render(){
    return(
      <div>
        <h2>{this.props.playlist.title}</h2>
        <SongsComp
          updateCurrentTrack={ this.props.updateCurrentTrack }
          mode={ 'playlist'}
          playlist={ this.props.playlist }
          // updateSelectedSong={ props.updateSelectedSong }
          songs={ this.props.playlist.songs }/>
      </div>
    );
}
}
