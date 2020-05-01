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
}

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
}

function* itemSaga() {
    yield takeLatest('SELECT_ITEM', selectEditItem);
    yield takeLatest('EDIT_ITEM', editItem);

}

export default itemSaga;