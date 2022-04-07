import {all, put, call, takeLatest } from 'redux-saga/effects'
import * as types from '../types'
import axios from '../../../services/axios';
import { toast } from 'react-toastify';
import * as actions from './actions';
import history from '../../../services/history';
import {get} from 'lodash';

function* loginRequest({payload}) {
  try {
    const response = yield call(axios.post, '/tokens', payload);
    yield put(actions.loginSuccess({...response.data}));

    toast.success('Login com successo');

    axios.defaults.headers.authorization = `${response.data.token}`;

    history.push(payload.prevPath)
  }catch(e){
    toast.error('Usuario ou senha invalidos.')

    yield put(actions.loginFailed())
  }
}

function persistRehydrate( {payload}){
  const token = get(payload, 'auth.token')
  if(!token) return;
  axios.defaults.headers.authorization = `${token}`;
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  //qual o tipo que sera chamado e a funcao acima
])
