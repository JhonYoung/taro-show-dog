import { combineReducers } from 'redux';

const SET_PROFILE = 'SET_PROFILE';
const SET_DICT = 'SET_DICT';

const initState = {
  profileReady: false,
  profile: null,
  dict: {}
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

const dictInfo = (state = initState, action = {}) => {
  switch (action.type) {
    case SET_DICT:
      return {
        ...state,
        dict: action.payload
      }
    default:
      return state;
  }
};

const reducer = combineReducers({
  userInfo,
  dictInfo
})

export default reducer;