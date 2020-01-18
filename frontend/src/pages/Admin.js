import React from 'react';
import Login from '../components/admin/Login';
import LoggedIn from '../components/admin/LoggedIn';
import SiteContext from '../SiteContext';
import './Admin.css';

export default function Admin() {
  const { loggedIn } = React.useContext(SiteContext);
  const content = (loggedIn) ? <LoggedIn /> : <Login />;
  return (
    <div className="admin-layout">
      {content}
    </div>
  );
}
