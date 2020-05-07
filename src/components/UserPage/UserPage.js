import React, { Component } from 'react';
import { connect } from 'react-redux';

import KitchenList from '../KitchenList/KitchenList';
import InviteList from '../InviteList/InviteList';

import 'cirrus-ui';
import './userPage.css'

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class UserPage extends Component {

  // when user page loads, get user's kitchen's and invite's
  componentDidMount(){
    this.props.dispatch( { type: 'GET_KITCHEN' } );
    // this.props.dispatch( { type: 'GET_INVITES' } );
  }

  render(){
    return (
      <div id="homePage">
        <div className="row">
          <div className="col-6 list">
            <KitchenList />
          </div>
        </div>
        <div className="row">
          <div className="col-6 list">
              <InviteList />
            </div>
        </div>
      </div>
    )
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = (state) => ({
  user: state.user,
  kitchen: state.kitchen,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
