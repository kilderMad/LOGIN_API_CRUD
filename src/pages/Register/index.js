import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { get } from 'lodash';

import { Container } from '../../styles/globalStyles';
import { Form } from './styled'
import axios from '../../services/axios';
import history from '../../services/history';

function Register() {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [password, setPassword] = useState('');

  async function handleSumit(e) {
    e.preventDefault();

    let formErrors = false;

    if(!isEmail(email)) {
      formErrors = true
      toast.error('Email invalido')
    }

    if(nome.length < 3 || nome.length > 255) {
      formErrors = true
      toast.error('Nome deve ter entre 3 e 255 caracteres')
    }
    if(password.length < 6 || password.length > 50) {
      formErrors = true
      toast.error('Senha deve ter entre 6 e 50 caracteres')
    }

    if (formErrors) return;

    try {
      await axios.post('/users/', {nome, password, email});
      toast.success('Cadastro feito!')
      history.push('/login')
    } catch(e) {
      const errors = get(e, 'response.data.errors', []);

      errors.map(error => toast.error(error))
    }
  }
  return (
      <Container>
        <h1>Register</h1>

        <Form onSubmit={handleSumit}>
          <div>
            <label htmlFor='nome'>Nome:</label>
            <input type='text' id='nome' onChange={e => setNome(e.target.value)}/>
          </div>
          <div>
            <label htmlFor='email'>Email:</label>
            <input type='email' id='email' onChange={e => setEmail(e.target.value)}/>
          </div>
          <div>
            <label htmlFor='password'>Senha:</label>
            <input type='password' id='password' onChange={e => setPassword(e.target.value)}/>
          </div>
          <button type='submit'>Cria Conta</button>
        </Form>
      </Container>
  );
}


export default Register

