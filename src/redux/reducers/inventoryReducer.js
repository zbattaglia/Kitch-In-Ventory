  const inventoryReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_INVENTORY':
        return action.payload;
      default:
        return state;
    }
  };
  
  // inventory will be on the redux state at:
  // state.kitchen
  export default inventoryReducer;
