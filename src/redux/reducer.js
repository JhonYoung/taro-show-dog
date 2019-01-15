import { combineReducers } from 'redux';

const SET_PROFILE = 'SET_PROFILE';
const initState = {
  profileReady: false,
  profile: null
}
const userInfo = (state = initState, action = {}) => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        profileReady: true
      }
    default:
      return state;
  }
};

const reducer = combineReducers({
  userInfo
})

export default reducer;