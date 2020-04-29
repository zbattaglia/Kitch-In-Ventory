import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Nav.css';
import 'cirrus-ui';

const Nav = (props) => (
  <div className="nav">
    <div className="header unselectable header-animated" id="header-nav">
    <div className="header-brand">
        <div className="nav-item no-hover">
            <h4 className="title">Kitch-In-Ventory</h4>
        </div>
    </div>
    <div className="header-nav">
        <div className="nav-right" id="header-item">
          <div className="nav-item">
            {/* Show this link if they are logged in or not, */}
            <Link to="/home">
            {/* but call this link 'Home' if they are logged in,
            and call this link 'Login / Register' if they are not */}
            {props.user.id ? 'Home' : 'Login / Register'}
            </Link>
          </div>
          {/* Show the link to the info, kitchen and Shopping list page's and the logout button if the user is logged in */}
          {props.user.id && (
          <>
          <div className="nav-item">
            <Link to="/info">
              Info Page
            </Link>
          </div>
          <div className="nav-item">
            <Link to='/kitchen'>
              Your Kitchen
            </Link>
          </div>
          <div className="nav-item">
            <Link to='/list'>
              Shopping List
            </Link>
          </div>
          <div className="nav-item">
            <Link to='/home' onClick={() => props.dispatch({ type: 'LOGOUT' })}>
              Log Out
            </Link>
          </div>
          </>
        )}
          <div className="nav-item">
            {/* Always show about link */}
            <Link to="/about">
              About
            </Link>
          </div>
        </div>
    </div>
</div>
</div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
