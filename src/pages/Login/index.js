import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash'

import { Container } from '../../styles/globalStyles';
import { Form } from './styled'
import * as actions from '../../store/modules/auth/actions'

import Loading from '../../components/Loading/Loading';

function Login(props) {
  const dispatch = useDispatch();

  const prevPath = get(props, 'location.state.prevPath', '/' );

  const isLoading = useSelector(state => state.auth.isLoading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSumit(e) {
    e.preventDefault();

    let formErrors = false;

    if(!isEmail(email)) {
      formErrors = true
      toast.error('Email invalido')
    }
    if(password.length < 6 || password.length > 50) {
      formErrors = true
      toast.error('Senha Invalida')
    }

    if (formErrors) return;

    dispatch(actions.loginRequest({email, password, prevPath}))
  }
  return (
      <Container>
        <Loading isLoading={isLoading}/>
        <h1>Login</h1>

        <Form onSubmit={handleSumit}>
          <div>
            <label htmlFor='email'>Email:</label>
            <input value={email} type='email' id='email' onChange={e => setEmail(e.target.value)}/>
          </div>
          <div>
            <label htmlFor='password'>Senha:</label>
            <input value={password} type='password' id='password' onChange={e => setPassword(e.target.value)}/>
          </div>
          <button type='submit'>Acessar</button>
        </Form>
      </Container>
  );
}


export default Login

