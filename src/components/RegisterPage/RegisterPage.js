import React, { Component } from 'react';
import {connect} from 'react-redux';
import './RegisterPage.css';

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    email: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password && this.state.email) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  closeModal = () => {
    this.props.dispatch( { type: 'CLEAR_REGISTRATION_ERROR' } );
  }

  render() {
    return (
      <div className="row" id="page-content">
        {this.props.errors.registrationMessage && (
          <div
          className="modal-content"
          role="alert"
          id="login-error"
          onClick={ this.closeModal}
        >
          <div className="modal-header" id="registration-error-header">
            <h2>
              <i class="fa fa-wrapper fa-exclamation-circle" ></i> 
            </h2> 
          </div>
          <div className="modal-body">
            <h2 id="modal-message">
              {this.props.errors.registrationMessage}
            </h2>
            <p id="modal-message">If you have an account try logging in.</p>
          </div>
          <div className="modal-footer" id="registration-modal-footer">
            <button>Try Again</button>
          </div>
        </div>
        )}
        <div className="col-4" id="register">
          <div className="card">
            <form onSubmit={this.registerUser}>
              <h1 id="Register-Header">Register User</h1>
              <div className="row">
                <div className="col-3 level-item">
                  <label htmlFor="username">Username:</label>
                </div>
                <div className="col-9 input-control ">
                  <input
                  className = "input-contains-icon Input-Field"
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleInputChangeFor('username')}
                  /><span className="icon"><i className="fa fa-wrapper fa-user"></i></span>
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
                  /><span className="icon"><i className="fa fa-wrapper fa-lock"></i></span>
                </div>
              </div>
              <div className="row">
                <div className="col-3 level-item">
                  <label htmlFor="password">Email:</label>
                </div>
                <div className="col-9 input-control ">
                  <input
                  className="input-contains-icon Input-Field"
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChangeFor('email')}
                  /><span className="icon"><i className="fa fa-wrapper fa-envelope"></i></span>
                </div>
              </div>
              <div className="btn-container" id="register-btn">
                  <input
                    type="submit"
                    className="btn-success btn-animated"
                    name="register"
                    value="Register"
                  />
                </div>
            </form>
          </div>
          <center>
            <div
              onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
            >
              <p id="Login-Link">Back to Login</p>
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

export default connect(mapStateToProps)(RegisterPage);

