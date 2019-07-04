import React, { Component } from 'react';

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




