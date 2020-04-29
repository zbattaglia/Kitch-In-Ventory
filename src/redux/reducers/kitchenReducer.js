const kitchenReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_KITCHEN':
        return action.payload;
      default:
        return state;
    }
  };
  
  // kitchen will be on the redux state at:
  // state.kitchen
  export default kitchenReducer;