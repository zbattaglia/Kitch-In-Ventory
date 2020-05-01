import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* selectEditItem(action) {
    console.log( 'In selectEditItemSaga', action );
  try {
      
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const itemId = action.payload.itemId;
    const kitchenId = action.payload.kitchenId;

    // get all item info for kitchen, if user logged in
    // the config includes credentials which
    // allow the server session to recognize the user
    const response = yield axios.get(`/api/item/${itemId}${kitchenId}`, config);
    
    // once kitchens are returned, put them on redux state
    yield put({ type: 'SET_EDIT_ITEM', payload: response.data });
  } catch (error) {
    console.log(`Error getting selected item:`, error);
  }
}; //end selectEditItem

function* deleteItem(action) {
  console.log( 'In deleteItem Saga', action.payload );
  try {

    let itemId = action.payload.itemId;
    let kitchenId = action.payload.kitchenId;

    yield axios.delete( `/api/item/${itemId}${kitchenId}` );

    yield put( { type: 'GET_INVENTORY', payload: kitchenId } );
  }
  catch( error ) {
    console.log( 'Error deleting item', error );
  }

}; // end deleteItem

function* editItem(action) {
  console.log( 'In editItemSaga', action );
  try {

    const itemInfo = { itemId: action.payload.itemId, itemDetails: action.payload.itemInfo };
    const kitchenId = action.payload.kitchenId;

    // make axios PUT request to server to update selected item with info
    // passed in action.payload.itemInfo
    yield axios.put(`/api/item/${kitchenId}`, itemInfo );

    // once item is edited, GET the items again.
    yield put({ type: 'GET_INVENTORY', payload: kitchenId });
  } catch (error) {
    console.log(`Error Editing Item:`, error);
  }
}; // end editItem

// worker Saga: will be fired on "ADD_ITEM" actions
function* addItem(action) {
  console.log( 'In add item Saga', action.payload );
  try {
    // post new item to kitchen list in database, if logged in
    yield axios.post(`/api/item/${action.payload.kitchenId}`, action.payload.itemInfo );
    
    // once kitchen is added, get all kitchens for user and put them on redux state
    yield put({ type: 'GET_INVENTORY', payload: action.payload.kitchenId });
  } catch (error) {
    console.log(`Error adding item:`, error);
  }
}; // end addItem Saga

function* itemSaga() {
    yield takeLatest('SELECT_ITEM', selectEditItem);
    yield takeLatest('EDIT_ITEM', editItem);
    yield takeLatest('DELETE_ITEM', deleteItem);
    yield takeLatest('ADD_ITEM', addItem);
}

export default itemSaga;