/**
 * Created by NEXUS on 04/04/2017.
 */
import Signup from './Signup';
import Signin from './Signin';
import Root from './Root';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

export default function Routes() {
  return (
    <BrowserRouter>
      <div className="main-root">
          <Switch>
            <Route path="/signin" component={ Signin }/>
            <Route path="/signup" component={ Signup }/>
            <Route path="/" component={ Root }/>
          </Switch>
      </div>
    </BrowserRouter>
  );
}
