import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  FETCH_DATA_REQUEST, fetchDataSuccess, fetchDataFailure,
  SIGN_IN_REQUEST, signInSuccess, signInFailure
} from './actions';
import { v4 as uuidv4 } from 'uuid';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY

const fetchDataFromAPI = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  if (!response.ok) throw new Error('Failed to fetch data');
  return await response.json();
};

function* fetchDataSaga(action) {
  try {
    const { lat, lon } = action.payload;
    const data = yield call(fetchDataFromAPI, lat, lon);
    yield put(fetchDataSuccess(data));
  } catch (error) {
    yield put(fetchDataFailure(error.message));
  }
}

function* signInSaga(action) {
  try {
    const { email, password } = action.payload;
    if (password.length < 6) throw new Error('Password must be at least 6 characters');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid email format');
    const user = { email, token: uuidv4() };
    localStorage.setItem('user', JSON.stringify(user));
    yield put(signInSuccess(user));
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

function* watchFetchData() {
  yield takeEvery(FETCH_DATA_REQUEST, fetchDataSaga);
}

function* watchAuth() {
  yield takeEvery(SIGN_IN_REQUEST, signInSaga);
}

export default function* rootSaga() {
  yield all([
    call(watchFetchData),
    call(watchAuth) 
  ]);
}
