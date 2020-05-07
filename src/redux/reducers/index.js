import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import kitchen from './kitchenReducer';
import inventory from './inventoryReducer';
import item from './itemReducer';
import shoppingList from './shoppingListReducer';
import invite from './inviteReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  kitchen, //will have all kitchens a user is a part of
  inventory, //will have all items in a kitchen's inventory
  item, //item will have current item being edited from a kitchen's inventory
  shoppingList, //shoppingList will have contents of current users shopping list
  invite, //invite will hold all the current user's pending invites
});

export default rootReducer;
