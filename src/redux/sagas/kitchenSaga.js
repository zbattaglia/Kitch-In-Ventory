import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "GET_KITCHEN" actions
function* fetchKitchen(action) {
    console.log( 'In fetchKitchenSaga', action );
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

// worker Saga: will be fired on "GET_KITCHEN" actions
function* addKitchen(action) {
  console.log( 'In fetchKitchenSaga', action.payload );
  try {
      
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // post kitchen to kitchen list in database and add user, if logged in
    // the config includes credentials which
    // allow the server session to recognize the user
    yield axios.post('/api/kitchen', action.payload, config);
    
    // once kitchen is added, get all kitchens for user and put them on redux state
    yield put({ type: 'GET_KITCHEN' });
  } catch (error) {
    console.log(`Error adding a kitchen:`, error);
  }
}

// worker Saga: will be fired on "GET_KITCHEN" actions
function* fetchInventory(action) {
  console.log( 'In fetchInventorySaga', action.payload );
  try {
      
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // get all contents of specified kitchen for user, if logged in
    // the config includes credentials which
    // allow the server session to recognize the user
    // the selected kitchen id is put on the request url as param's
    const response = yield axios.get(`/api/kitchen/inventory/${action.payload}`, config )
    
    // once kitchens are returned, put them on redux state
    yield put({ type: 'SET_INVENTORY', payload: {inventory: response.data, selectedKitchen: action.payload } } );
    yield put({ type: 'UPDATE_SHOPPING_LIST', payload: {inventory: response.data, selectedKitchen: action.payload } } );
  } catch (error) {
    console.log(`Error getting kitchen's inventory:`, error);
  }
}

function* kitchenSaga() {
  yield takeLatest('GET_KITCHEN', fetchKitchen);
  yield takeLatest('ADD_KITCHEN', addKitchen);
  yield takeLatest('GET_INVENTORY', fetchInventory );
}

export default kitchenSaga;