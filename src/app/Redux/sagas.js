import { call, put, takeEvery } from 'redux-saga/effects';
import {
  FETCH_DATA_REQUEST, fetchDataSuccess, fetchDataFailure,
  SIGN_IN_REQUEST, signInSuccess, signInFailure
} from './actions';
import { v4 as uuidv4 } from 'uuid';

const API_KEY = '6d7774b3ca7df9706c9be3830263145a';

// Weather API Call
const fetchDataFromAPI = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  if (!response.ok) throw new Error('Failed to fetch data');
  return await response.json();
};

// Worker Saga for Weather Data
function* fetchDataSaga(action) {
  try {
    const { lat, lon } = action.payload;
    const data = yield call(fetchDataFromAPI, lat, lon);
    yield put(fetchDataSuccess(data));
  } catch (error) {
    yield put(fetchDataFailure(error.message));
  }
}

// Worker Saga for Authentication
function* signInSaga(action) {
  console.log('sagainsaga')
  try {
    const { email, password } = action.payload;

    if (password.length < 6) throw new Error('Password must be at least 6 characters');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid email format');

    const user = { email, token: uuidv4() };

    localStorage.setItem('user', JSON.stringify(user));

    console.log(user)
    yield put(signInSuccess(user));
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

// Watcher Sagas
function* watchFetchData() {
  yield takeEvery(FETCH_DATA_REQUEST, fetchDataSaga);
}

function* watchAuth() {
  console.log('req saga')
  yield takeEvery(SIGN_IN_REQUEST, signInSaga);
}

// Root Saga
export default function* rootSaga() {
  yield watchFetchData();
  yield watchAuth();
}
