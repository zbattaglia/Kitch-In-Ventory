import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchShoppingList(action) {
    console.log( 'In fetch shoppingListSaga', action );
  try {

    const response = yield axios.get(`/api/list`);
    
    // once list contents are returned, put them on redux state
    yield put({ type: 'SET_SHOPPING_LIST', payload: response.data });
  } catch (error) {
    console.log(`Error getting shopping list:`, error);
  }
}; //end fetchShoppingList

function* editItemOnList(action) {
  console.log( 'In editItemOnList Saga', action );
  try {
    yield axios.put(`/api/list/edit/${action.payload.itemId}/${action.payload.listId}`, {quantity: action.payload.quantity} );
    
    // when edit is successful, refresh the shopping list
    yield put({ type: 'GET_SHOPPING_LIST' });
  } catch (error) {
    console.log(`Error getting shopping list:`, error);
  }
}; //end editItemOnList

function* updateShoppingList(action) {
  console.log( 'In updateShoppingList Saga', action );
  try {

    yield axios.put(`/api/list/update/${action.payload.selectedKitchen}`, action.payload.inventory);
    
    // once list is updated, get new shopping list
    yield put({ type: 'GET_SHOPPING_LIST' });
  } catch (error) {
    console.log(`Error getting shopping list:`, error);
  }
}; //end fetchShoppingList

function* addItemToList(action) { 
  console.log( 'In addItemToList Saga', action );
  const itemInfo = action.payload;
  try {

    yield axios.post(`/api/list`, itemInfo );
    
    // once list contents are returned, put them on redux state
    // yield put({ type: 'SET_SHOPPING_LIST', payload: response.data[0] });
  } catch (error) {
    console.log(`Error getting shopping list:`, error);
  }
}; //end fetchShoppingList

function* deleteItemFromList(action) { 
  console.log( 'deleteItemFromList Saga', action );
  try {

    yield axios.delete(`/api/list/${action.payload.itemId}/${action.payload.listId}` );
    
    // once item is deleted, update shopping list on redux state
    yield put({ type: 'GET_SHOPPING_LIST' });
  } catch (error) {
    console.log(`Error deleting item from shopping list:`, error);
  }
}; //end deleteFromList

function* shoppingListSaga() {
    yield takeLatest('GET_SHOPPING_LIST', fetchShoppingList);
    yield takeLatest('UPDATE_SHOPPING_LIST', updateShoppingList);
    yield takeLatest('ADD_TO_SHOPPING_LIST', addItemToList);
    yield takeLatest('DELETE_FROM_SHOPPING_LIST', deleteItemFromList);
    yield takeLatest('EDIT_SHOPPING_LIST', editItemOnList);

}

export default shoppingListSaga;