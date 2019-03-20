const initialState = {
};

const rootReducer = (state = initialState, action) => {
  console.log('adding participant', action.type);
  switch (action.type) {
    default:
      return state;
  }
};

export default rootReducer;
