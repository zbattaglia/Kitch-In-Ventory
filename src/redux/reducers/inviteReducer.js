const inviteReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_INVITE':
        return action.payload;
      default:
        return state;
    }
  };
  
//   item details will be on the redux state at:
//   state.invite
  export default inviteReducer;