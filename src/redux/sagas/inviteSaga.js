import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// saga fired each time an invite is sent
function* inviteUser(action) {
    console.log( 'Inviting user in inviteUser Saga', action );
    try {
        axios.post('/api/invite', action.payload )
    }
    catch(error) {
        console.log( 'Error inviting user', error );
    }
}; // end inviteUser

// saga fired each time user page loads to get user's invites
function* fetchInvite(action) {
    console.log( 'In fetchInvite Saga' );
    try {
        const response = yield axios.get( '/api/invite' )

        // console.log( 'Got user invites', response.data );
        // Once invite list is returned, send to reducer
         yield put( { type: 'SET_INVITE', payload: response.data } );
    }
    catch(error) {
        console.log( 'Error getting invites', error );
    }
}; //end fetchInvite


function* deleteInvite(action) {
    // console.log( 'accepting invite in deleteInvite Saga', action );
    try {
        yield axios.delete( `/api/invite/${action.payload}` )
    }
    catch(error) {
        console.log( 'Error accepting invite', error);
    }
}; // end deleteInvite


function* inviteSaga() {
  yield takeLatest('INVITE_USER', inviteUser);
  yield takeLatest('GET_INVITE', fetchInvite);
  yield takeLatest('ACCEPT_INVITE', deleteInvite);
}

export default inviteSaga;
