import {
  FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE,
  SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE
} from './actions';

const initialState = {
  data: [], 
  loading: false,
  error: null,
  user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem('user')) || null : null, // Safe check
  authLoading: false,
  authError: null,
};

const rootReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    // Weather Reducer Cases
    case FETCH_DATA_REQUEST:
      return { ...state, loading: true };
    case FETCH_DATA_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Authentication Reducer Cases
    case SIGN_IN_REQUEST:
      console.log('req signin', action)
      return { ...state, authLoading: true, authError: null };
    case SIGN_IN_SUCCESS:
      return { ...state, authLoading: false, user: action.payload };
    case SIGN_IN_FAILURE:
      return { ...state, authLoading: false, authError: action.payload };

    default:
      return state;
  }
};

export default rootReducer;
