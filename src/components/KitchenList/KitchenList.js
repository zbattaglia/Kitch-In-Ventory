import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'cirrus-ui';
import './kitchenList.css';

import AddKitchenForm from '../AddKitchenForm/AddKitchenForm';

class KitchenList extends Component {

    // set initial state to hide modal window for inviting user's
    state = {
        modal: false,
        inviteKitchen: '',
        inviteUser: '',
    };

    // updates inviteUser on state to current value in input field
    handleChange = (event) => {
        // console.log( 'Change on username', event.target.value );
        this.setState({
            ...this.state,
            inviteUser: event.target.value,
        });
    }

    // on click of link, dispatch action to get kitchen inventory
    handleLink = ( event, id ) => {
        // console.log( 'Got a click on a kitchen', id );
        this.props.dispatch( { type: 'GET_INVENTORY', payload: id } );
    }

    // function to send invites on button click
    handleInvite = (event, kitchenId) => {
        // console.log( 'Sending an invite', kitchenId );
        this.setState({
            modal: true,
            inviteKitchen: kitchenId,
        });
    }; // end handle invite

    // function to handle send invite button
    sendInvite = () => {
        console.log( 'Sending invite', this.state.inviteKitchen, this.state.inviteUser )
        this.props.dispatch( { type: 'INVITE_USER', payload: {user: this.state.inviteUser, kitchenId: this.state.inviteKitchen} } );
        this.closeModal()
    }; // end sendInvite

    // function to close invite modal and reset state
    closeModal() {
        this.setState({
            modal: false,
            inviteKitchen: '',
            inviteUser: '',
        })
    }

  render(){
    return (
        <div>
            <AddKitchenForm id="kitchen-form"/>
            <div className="card" id="content">
                <div className="card-header" id="kitchen-list-header">
                    <p className="kitchens-title">{this.props.user.username}'s kitchens</p>
                </div>
                <div className="divider"></div>
                <div className="content">
                    <p id="kitchenList-info">Click on a kitchen to view it's contents.</p>
                    <ul className="no-bullets">
                        { this.props.kitchen.map( kitchen => 
                            <li key={kitchen.kitchen_id} id="kitchenList">
                                <div className="kitchen-li">
                                    <Link to='/kitchen' onClick={ (event) => this.handleLink(event, kitchen.kitchen_id) }>
                                        {kitchen.name}
                                    </Link>
                                </div>
                                    <button
                                        className="btn-link btn-small"
                                        id="invite-btn"
                                        onClick={ (event) => this.handleInvite(event, kitchen.kitchen_id)}
                                        >
                                        <i className="fa fa-wrapper fa-paper-plane"></i>
                                            Invite
                                    </button>
                            </li>
                        )}
                    </ul>
                </div>
                {/* Content below is hidden until inviting user to join kitchen */}
                { this.state.modal &&
                    <div className="modal-content" id="invite-modal">
                        <div className="modal-header">
                            <h4 id="invite-modal-header">Invite User</h4>
                        </div>
                        <div className="modal-body" id="invite-form">
                            <p>Username:</p>
                            <input
                            type="text"
                            className="level-item"
                            id="invite-username"
                            onChange={ (event) => this.handleChange(event)}
                            ></input>
                        </div>
                        <div className="modal-foote">

                            <div className="btn-container" id="invite-modal-footer">
                            <button className="btn" onClick={ (event) => this.closeModal()} id="cancel-btn">
                                    CANCEL
                                </button>
                                <button className="btn-link" onClick={ (event) => this.sendInvite()} id="send-btn">
                                    SEND
                                </button>
                            </div>
                        </div>
                    </div>
                }
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