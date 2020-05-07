import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'cirrus-ui';
import './InviteList.css';

class InviteList extends Component {

    acceptInvite = ( kitchenId ) => {
        // console.log( 'Accepting Invite', kitchenId );
        this.props.dispatch( { type: 'ACCEPT_INVITE', payload: kitchenId } )
    }

  render(){
    return (
        <div>
            <div className="card u-flex u-flex-column h-100">
                <div className="card-header" id="invite-list-header">
                    <p className="invites-title">Invites</p>
                </div>
                <div className="divider"></div>
                <div className="content">
                    { (this.props.inviteList.length === 0) ?
                    <p id="empty-invite-info">No Open invites.</p>
                    :
                    <ul className="no-bullets">
                        { this.props.inviteList.map( invite => 
                            <li key={invite.id} id="invite-list">
                                {invite.name}
                                <form>
                                    <button
                                        className="btn-success btn-small"
                                        onClick={() => this.acceptInvite( invite.id)}>
                                            ACCEPT
                                    </button>
                                </form>
                            </li>
                        )}
                    </ul>
                    }
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
  inviteList: state.invite,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InviteList);