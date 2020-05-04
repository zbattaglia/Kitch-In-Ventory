import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchShoppingList(action) {
    console.log( 'In shoppingListSaga', action );
  try {

    const response = yield axios.get(`/api/list`);
    
    // once list contents are returned, put them on redux state
    yield put({ type: 'SET_SHOPPING_LIST', payload: response.data });
  } catch (error) {
    console.log(`Error getting shopping list:`, error);
  }
}; //end fetchShoppingList

function* updateShoppingList(action) {
  console.log( 'In updateShoppingList Saga', action );
  try {

    yield axios.put(`/api/list/update/${action.payload.selectedKitchen}`, action.payload.inventory);
    
    // once list contents are returned, put them on redux state
    // yield put({ type: 'SET_SHOPPING_LIST', payload: response.data });
  } catch (error) {
    console.log(`Error getting shopping list:`, error);
  }
}; //end fetchShoppingList

function* putItemOnList(action) { 
  console.log( 'In putItemOnList Saga', action );
  try {

    yield axios.post(`/api/list/${action.payload.itemId}/${action.payload.kitchenId}`, action.payload);
    
    // once list contents are returned, put them on redux state
    // yield put({ type: 'SET_SHOPPING_LIST', payload: response.data[0] });
  } catch (error) {
    console.log(`Error getting shopping list:`, error);
  }
}; //end fetchShoppingList

function* deleteItemFromList(action) { 
  console.log( 'deleteItemFromList Saga', action );
  try {

    yield axios.delete(`/api/list/${action.payload.itemId}/${action.payload.listId}`, action.payload);
    
    // once item is deleted, update shopping list on redux state
    yield put({ type: 'GET_SHOPPING_LIST' });
  } catch (error) {
    console.log(`Error deleting item from shopping list:`, error);
  }
}; //end deleteFromList

function* shoppingListSaga() {
    yield takeLatest('GET_SHOPPING_LIST', fetchShoppingList);
    yield takeLatest('UPDATE_SHOPPING_LIST', updateShoppingList);
    yield takeLatest('ADD_TO_SHOPPING_LIST', putItemOnList);
    yield takeLatest('DELETE_FROM_SHOPPING_LIST', deleteItemFromList);
}

export default shoppingListSaga;