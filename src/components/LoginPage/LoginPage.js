import React, { Component } from 'react';
import { connect } from 'react-redux';
// style
import 'cirrus-ui';
import './LoginPage.css';

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div className="row">
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <div className="col-4" id="login">
          <div className="card">
            <form onSubmit={this.login}>
              <h1 id="LogIn-Header">Login</h1>
              <div className="row">
                <div className="col-3 level-item">
                  <label htmlFor="username">Username:</label>
                </div> 
                  <div className="col-9 input-control ">
                    <input
                      className="input-contains-icon Input-Field"
                      type="text"
                      name="username"
                      value={this.state.username}
                      onChange={this.handleInputChangeFor('username')}  
                    ></input><span className="icon"><i className="fa fa-wrapper fa-user"></i></span>
                </div>
              </div>
              <div className="row">
                <div className="col-3 level-item">
                  <label htmlFor="password">Password:</label>
                </div> 
                  <div className="col-9 input-control ">
                    <input
                      className="input-contains-icon Input-Field"
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleInputChangeFor('password')}  
                    ></input><span className="icon"><i className="fa fa-wrapper fa-lock"></i></span>
                  </div>
              </div>
                <div className="btn-container">
                  <input
                    type="submit"
                    className="btn-light btn-animated"
                    name="submit"
                    value="Submit"
                  />
                </div>
            </form>
          </div>
          <center>
            <div
              onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
            >
              <p id="Register-Link">Don't have an account? Register HERE</p>
            </div>
          </center>
        </div>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
