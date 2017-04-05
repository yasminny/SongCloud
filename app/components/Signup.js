import {
  NavLink
} from 'react-router-dom';
export default function Signup() {
 return (
   <div className="sign register">
     <i className="fa fa-mixcloud big-logo" aria-hidden="true"/>
     <h1>SongCloud</h1>
     <form>
       <h2>Create account</h2>
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
       <h3>Already have an account?</h3>
       <button type="button" className="go-to-signin-btn"><NavLink to="signin">Sign in</NavLink></button>
     </footer>
   </div>
 );
}
