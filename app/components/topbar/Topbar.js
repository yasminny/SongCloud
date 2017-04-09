import './topbar.scss';
import {
  NavLink
} from 'react-router-dom';
import './topbar.scss';

export default function Topbar() {
 return (
   <div className="topbar-comp">
     <nav className="navbar">
       <div className="left">
         <ul className="menu">
           <li><div className="logo-part">
             <NavLink to="/" className="logo-name"><i className="fa fa-mixcloud nav-logo" aria-hidden="true"/>SongCloud</NavLink>
           </div></li>
           <li className="links"><NavLink to="/explore" activeClassName="selected-nav" className="link">Explore</NavLink></li>
           <li className="links"><NavLink to="/playlists" activeClassName="selected-nav" className="link">Playlists</NavLink></li>
         </ul>
       </div>
       <div className="right">
         <input type="text" className="search" placeholder="SEARCH"/>
         <span className="fa fa-search" aria-hidden="true"> </span>
         <button type="button" className="logout"><NavLink to="/signin">Logout</NavLink></button>
       </div>

     </nav>
   </div>
 );
}
