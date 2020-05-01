const itemReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_EDIT_ITEM':
        return action.payload;
      default:
        return state;
    }
  };
  
//   item details will be on the redux state at:
//   state.item
  export default itemReducer;