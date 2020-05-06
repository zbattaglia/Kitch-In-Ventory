import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'cirrus-ui';
import './kitchenList.css';

import AddKitchenForm from '../AddKitchenForm/AddKitchenForm';

class KitchenList extends Component {

    // on click of link, dispatch action to get kitchen inventory
    handleLink = ( event, id ) => {
        console.log( 'Got a click on a kitchen', id );
        this.props.dispatch( { type: 'GET_INVENTORY', payload: id } );
    }

  render(){
    return (
        <div>
            <AddKitchenForm id="kitchen-form"/>
            <div className="card" id="content">
                <div className="card-header">
                    <p className="kitchens-title">{this.props.user.username}'s kitchens</p>
                </div>
                <div className="divider"></div>
                <div className="content">
                    <p>Click on a kitchen to view it's contents.</p>
                    <ul className="no-bullets">
                        { this.props.kitchen.map( kitchen => 
                            <li key={kitchen.kitchen_id} id="kitchenList">
                                <div className="kitchen-li">
                                    <Link to='/kitchen' onClick={ (event) => this.handleLink(event, kitchen.kitchen_id) }>
                                        {kitchen.name}
                                    </Link>
                                </div>
                                    <button
                                        className="btn-success"
                                        id="invite-btn">
                                        <i className="fa fa-wrapper fa-paper-plane"></i>
                                            Invite
                                    </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  kitchen: state.kitchen,
});

// Allows for KitchenList to be called on the user Page
export default connect(mapStateToProps)(KitchenList);