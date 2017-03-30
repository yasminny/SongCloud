import {
  NavLink
} from 'react-router-dom';
export default function Topbar() {
 return (
   <div>
     <nav className="navbar">
       <ul className="menu">
         <li><NavLink to="/" className="logo-name"><i className="fa fa-mixcloud nav-logo" aria-hidden="true"/>SongCloud</NavLink></li>
         <li><NavLink to="explore" exact activeClassName="selected" className="link">Explore</NavLink></li>
         <li><NavLink to="playlists" exact activeClassName="selected" className="link">Playlists</NavLink></li>
       </ul>
       <input type="text" className="search"/>
       <button type="button" className="logout"><NavLink to="signin">Logout</NavLink></button>
     </nav>
   </div>
 );
}
