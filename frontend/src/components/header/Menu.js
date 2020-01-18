import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import SiteContext from '../../SiteContext';


export default class Menu extends React.Component {
    logOutHandler = (e) => {
      const { loginHandler } = this.context;
      e.preventDefault();
      loginHandler(false);
    }

    render() {
      const { loggedIn } = this.context;
      const logOutShow = (loggedIn) ? 'show' : 'hide';
      return (
        <nav>
          <Link to="/">home</Link>
          <Link to="/calendar">calendar</Link>
          <Link to="/admin">admin</Link>
          <button
            type="button"
            className={logOutShow}
            onClick={this.logOutHandler}
          >log out</button>
        </nav>
      );
    }
}
Menu.contextType = SiteContext;
