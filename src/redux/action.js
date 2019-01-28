function setProfile(profile) {
  return {
    type: 'SET_PROFILE',
    payload: profile
  }
}

function setDict(dict) {
  return {
    type: 'SET_DICT',
    payload: dict
  }
}

export default {
  setProfile,
  setDict
}