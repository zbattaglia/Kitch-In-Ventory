import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "GET_KITCHEN" actions
function* fetchKitchen(action) {
    console.log( 'In fetchKitchenSaga', action.payload );
  try {
      
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // get all kitchens for user, if logged in
    // the config includes credentials which
    // allow the server session to recognize the user
    const response = yield axios.get('/api/kitchen', action.payload, config);
    
    // once kitchens are returned, put them on redux state
    yield put({ type: 'SET_KITCHEN', payload: response.data });
  } catch (error) {
    console.log(`Error getting user's kitchen's:`, error);
  }
}

function* kitchenSaga() {
  yield takeLatest('GET_KITCHEN', fetchKitchen);

}

export default kitchenSaga;