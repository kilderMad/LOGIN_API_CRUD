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

function* registerRequest({ payload }) {
  const {id, nome, email, password} = payload


  try {
    if(id) {
      yield call(axios.put, '/users', {email,
         nome,
         password: password || undefined
      });
      toast.success('Conta alterada com sucesso')
      yield put(actions.registerUpdatedSuccess({nome, email, password}))
    }else {
      yield call(axios.post, '/users', {email, nome, password });
      toast.success('Conta criada com sucesso')
      yield put(actions.registerCreatedSuccess({nome, email, password}))
      history.push("/login")
    }
  } catch (e) {
    const errors = get(e, 'response.data.errors', []);
    const status = get(e, 'reponse.status', 0);

    if(status === 401) {
      toast.error('Voce prcisa fazer login novamente')
      yield put(actions.loginFailed());
      return history.push('/login')
    }

    if (errors.length > 0 ){
      errors.map(error => toast.error(error))
    }else {
      toast.error('Error desconhecido')
    }

    yield put(actions.registerFailure())
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  //qual o tipo que sera chamado e a funcao acima
])
