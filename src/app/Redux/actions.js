// Weather Actions
export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

// Auth Actions
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
export const LOGOUT = 'LOGOUT';

// Weather Action Creators
export const fetchDataRequest = (lat, lon) => ({
  type: FETCH_DATA_REQUEST,
  payload: { lat, lon },
});

export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});

// Auth Action Creators
export const signInRequest = (email, password) => ({
  type: SIGN_IN_REQUEST,
  payload: { email, password },
});

export const signInSuccess = (user) => (
  {
  type: SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (error) => ({
  type: SIGN_IN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});