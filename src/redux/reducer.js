import { combineReducers } from 'redux';

const SET_PROFILE = 'SET_PROFILE';
const userInfo = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload
      }
    default:
      return state;
  }
};

const reducer = combineReducers({
  userInfo
})

export default reducer;