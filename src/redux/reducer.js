import * as actionTypes from "./actions";
import initialState from "./initialState";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APPLICATION_FORMDATA: {
      return {
        ...state,
        applicationFormdata: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
