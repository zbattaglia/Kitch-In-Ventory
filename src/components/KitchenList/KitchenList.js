import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import 'cirrus-ui';
// import './kitchenList.css';

class KitchenList extends Component {

  render(){
    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <p className="card-head-title">{this.props.user.username}'s kitchens</p>
                </div>
                <div className="divider"></div>
                <div className="content">
                    <p>Click on a kitchen to view it's contents.</p>
                    <ul className="no-bullets">
                        { this.props.kitchen.map( kitchen => 
                            <li key={this.props.kitche_id}>
                                    {kitchen.name}
                                <button>Invite</button>
                            </li>
                        )}
                    </ul>
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
export default connect(mapStateToProps)(KitchenList);