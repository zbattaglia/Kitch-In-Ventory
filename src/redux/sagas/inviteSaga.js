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


function* inviteSaga() {
  yield takeLatest('INVITE_USER', inviteUser);
}

export default inviteSaga;
