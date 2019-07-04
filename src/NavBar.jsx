import React, { Component } from 'react';

// The component that renders the navigation bar, including the user count
class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <p className="online-users">{this.props.onlineUser}</p>
      </nav>
    );
  }
}

export default NavBar;




