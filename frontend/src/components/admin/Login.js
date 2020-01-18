import React from 'react';
import AuthApiService from '../../services/auth-api-services';
import SiteContext from '../../SiteContext';
import './Login.css';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      errorMessage: '',
    };
  }

      logOutHandler = (e) => {
        e.preventDefault();
        const { loginHandler } = this.context;
        loginHandler(false);
      }

      onSubmit = (e) => {
        e.preventDefault();
        this.setState({ errorMessage: '' });
        const { password } = this.state;
        const { loginHandler } = this.context;
        AuthApiService.postLogin(password)
          .then((result) => {
            this.setState({ password: '' });
            if (result.login === true) {
              loginHandler(true);
            } else {
              this.setState({ errorMessage: 'This was not correct.' });
            }
          });
      }

      onChangeHandler = (e) => {
        this.setState({ password: e.target.value });
      }

      render() {
        const { password, errorMessage } = this.state;
        return (
          <form id="login-form" onSubmit={this.onSubmit}>
            <input
              type="password"
              value={password}
              onChange={this.onChangeHandler}
            />
            <input type="submit" />
            <div className="errorMessage">{ errorMessage }</div>
          </form>
        );
      }
}

Login.contextType = SiteContext;
