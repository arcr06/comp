import React from 'react';
import {NavLink} from 'react-router-dom';

export default function Navbar() {
  return (
      <div className="link_list">
        <NavLink exact className="link" activeClassName="link_active" to="/events">Events</NavLink>
        <NavLink exact className="link" activeClassName="link_active" to="/">home</NavLink>
        <NavLink exact className="link" activeClassName="link_active" to="/eventDetail">EVENT deatails</NavLink>
      </div>
  )
}

