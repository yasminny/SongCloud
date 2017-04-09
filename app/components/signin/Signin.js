import './signin.scss';
import {
  NavLink
} from 'react-router-dom';
export default function Signin() {
 return (
   <div className="sign register signin-comp">
     <i className="fa fa-mixcloud big-logo" aria-hidden="true"/>
     <h1>SongCloud</h1>
     <form>
       <h2>Sign in</h2>
       <label>
         Email
         <input type="email" className="user-name"/>
       </label>
       <label>
         Password
         <input type="password" className="pass"/>
       </label>
       <button type="submit" className="signup-btn"><NavLink to="explore">Continue</NavLink></button>
     </form>
     <footer>
       <h3>Don't have an account yet?</h3>
       <button type="button" className="go-to-signin-btn"><NavLink to="signup">Create Account</NavLink></button>
     </footer>
   </div>
 );
}
