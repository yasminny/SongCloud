import Signup from './Signup';
import Signin from './Signin';
import Explore from './Explore';
import Playlists from './Playlists';
import {
  BrowserRouter, Redirect,
  Route,
  Switch
} from 'react-router-dom';

export default function Root() {

  return (
    <BrowserRouter>
      <div className="main-root">
        <main>
        <Switch>
          <Route exact path="/" component={ ()=>(
            <Redirect to="/explore"/>
          ) }/>
          <Route path="/signin" component={ Signin }/>
          <Route path="/signup" component={ Signup }/>
          <Route path="/explore" component={ Explore }/>
          <Route path="/playlists" component={ Playlists }/>
        </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
};
