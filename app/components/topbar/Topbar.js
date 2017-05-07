import './topbar.scss';
import {
  NavLink
} from 'react-router-dom';
import './topbar.scss';
import React from 'react';

export default class Topbar extends React.Component {
  constructor() {
    super();
    this.state = {
    };
    this.handelSearchSubmit = this.handelSearchSubmit.bind(this);
  }

  handelSearchSubmit(e) {
    e.preventDefault();
    const search = this.searchElem.value;
    if (search.length > 0){
      this.props.history.push(`/explore/${search}?search=true`);
    }
  }

  render() {
    return (
      <div className="topbar-comp">
        <nav className="navbar">
          <div className="left">
            <ul className="menu">
              <li>
                <div className="logo-part">
                  <NavLink to="/" className="logo-name"><i className="fa fa-mixcloud nav-logo" aria-hidden="true"/>SongCloud</NavLink>
                </div>
              </li>
              <li className="links"><NavLink to="/explore" activeClassName="selected-nav"
                                             className="link">Explore</NavLink></li>
              <li className="links"><NavLink to="/playlists" activeClassName="selected-nav"
                                             className="link">Playlists</NavLink></li>
            </ul>
          </div>
          <div className="right">
            <form onSubmit={this.handelSearchSubmit}>
              <input type="text" className="search" placeholder="SEARCH" ref={(elem)=> this.searchElem = elem}/>
              <span className="fa fa-search" aria-hidden="true" onClick={this.handelSearchSubmit}> </span>
            </form>
            <button type="button" className="logout"><NavLink to="/signin">Logout</NavLink></button>
          </div>
        </nav>
      </div>
    );
  }
}
