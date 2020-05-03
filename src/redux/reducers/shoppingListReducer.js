const shoppingListReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_SHOPPING_LIST':
        return action.payload;
      default:
        return state;
    }
  };
  
//   current shoppomg list will be on the redux state at:
//   state.shoppingList
  export default shoppingListReducer;