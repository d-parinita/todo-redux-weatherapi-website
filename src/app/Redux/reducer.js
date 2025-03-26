import {
  FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE,
  SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE, LOGOUT 
} from './actions';

const initialState = {
  data: [], 
  loading: false,
  error: null,
  user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem('user')) || null : null, 
  authLoading: false,
  authError: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return { ...state, loading: true };
    case FETCH_DATA_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SIGN_IN_REQUEST:
      return { ...state, authLoading: true, authError: null };
    case SIGN_IN_SUCCESS:
      return { ...state, authLoading: false, user: action.payload };
    case SIGN_IN_FAILURE:
      return { ...state, authLoading: false, authError: action.payload };
    case LOGOUT:
        return { ...initialState, user: null };
    default:
      return state;
  }
};

export default rootReducer;
