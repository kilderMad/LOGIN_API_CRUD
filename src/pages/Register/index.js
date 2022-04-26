import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useSelector, useDispatch } from 'react-redux';

import { Container } from '../../styles/globalStyles';
import { Form } from './styled'
import Loading from '../../components/Loading/Loading';
import * as actions from '../../store/modules/auth/actions'

function Register() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user)
  const id = useSelector(state => state.auth.user.id)
  const isLoading = useSelector(state => state.auth.isLoading)

  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [password, setPassword] = useState('');

  React.useEffect(()=>{
    if(!user.id) return;

    setNome(user.nome);
    setEmail(user.email);
  },[user.email, user.id, user.nome])

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
    if(!user.id && (password.length < 6 || password.length > 50)) {
      formErrors = true
      toast.error('Senha deve ter entre 6 e 50 caracteres')
    }

    if (formErrors) return;

    dispatch(actions.registerRequest({ nome, email, password, id}));
  }
  return (
      <Container>
      <Loading isLoading={isLoading}/>
        <h1>{user.id? 'Editar Usuario': 'Criar sua Conta'}</h1>

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
          <button type='submit'>{user.id? 'Salvar' : 'Cria Conta'}</button>
        </Form>
      </Container>
  );
}


export default Register

