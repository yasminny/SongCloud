import Signup from '../signup/Signup';
import Signin from '../signin/Signin';
import React from 'react';
import Root from '../root/Root';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

export default function Routes() {
  return (
    <BrowserRouter>
      <div className="main-root routes-comp">
        <Switch>
          {/*components created for setting up the log in option*/}
          {/*<Route path="/signin" component={ Signin }/>*/}
          {/*<Route path="/signup" component={ Signup }/>*/}
          <Route path="/" component={ Root }/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
