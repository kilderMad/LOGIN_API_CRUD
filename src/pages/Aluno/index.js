import React, { useState, useEffect } from 'react';
import { get } from 'lodash'
import PropTypes from 'prop-types'
import { isEmail, isInt} from 'validator'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { FaUserCircle, FaEdit } from 'react-icons/fa'

import { Container } from '../../styles/globalStyles';
import { Form, ProfilePicture } from './styled';
import Axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions'
import { Link } from 'react-router-dom';

function Aluno({ match }) {
  const dispatch = useDispatch();
  const id = get(match, 'params.id', '');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [foto, setFoto] = useState('');
  useEffect(()=>{
    if(!id) return ;

    async function getData(){
      try {
        const {data} = await Axios.get(`/alunos/${id}`)

        const Foto = get(data, 'Fotos[0].url', '')
        setFoto(foto)
        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
      } catch (err) {
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if(status === 400){
          errors.map(error => toast.error(error))
          history.push('/')
        }
      }
    }

    getData()
  },[id])

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if(nome.length < 3 || nome.length > 255) {
      toast.error( 'Nome precisa ter entre 3 e 255 caracteres')
      formErrors = true;
    }

    if(sobrenome.length < 3 || sobrenome.length > 255) {
      toast.error( 'Sobrenome precisa ter entre 3 e 255 caracteres')
      formErrors = true;
    }

    if (!isEmail(email)){
      toast.error('Email Invalido')
      formErrors = true
    }

    if(!isInt(String(idade))){
      toast.error('Idade Invalida')
      formErrors = true
    }

    if(formErrors) return;

    try {
      if(id){
        //editando
        await Axios.put(`/alunos/${id}`, {nome, sobrenome, email, idade });
        toast.success('Aluno(a) editado(a) com sucesso!');
        history.push('/');
      }else {
        //criando
        console.log('tentanto criar')
        await Axios.post('/alunos/', {nome, sobrenome, email, idade });
        toast.success('Aluno(a) cadastrado(a) com sucesso!');
        history.push('/');
      }
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const errors = get(err, 'response.data.errors', []);
      const data = get(data, 'response.data', []);

      if(errors.length > 0 ) {
        errors.map(error => toast.error(error))
      } else {
        toast.error('Erro Desconhecido');
      }

      if(status === 401) {
        dispatch(actions.loginFailed())
      }

    }
  }

  return (
    <div>
      <Container>
        <h1>{id? 'Editar aluno' : 'Adicionar aluno'}</h1>
        { id &&
        (<ProfilePicture>
          {foto? (
            <img src={foto} alt={nome}></img>
          ) : (
            <FaUserCircle size={180} />
          )}
          <Link to={`/fotos/${id}`}><FaEdit size={24} className='iconBlack'/></Link>
        </ProfilePicture>)}
        <Form onSubmit={handleSubmit}>
          <input type='text' value={nome} onChange={e => setNome(e.target.value)}
            placeholder='Digite seu Nome'
          />

          <input type='text' value={sobrenome} onChange={e => setSobrenome(e.target.value)}
            placeholder='Digite seu Sobrenome'
          />

          <input type='email' value={email} onChange={e => setEmail(e.target.value)}
            placeholder='Digite seu Email'
          />

          <input type='number' value={idade} onChange={e => setIdade(e.target.value)}
            placeholder='Digite sua Idade'
          />
          <button type='submit'> Enviar</button>
        </Form>
      </Container>
    </div>
  );
}


export default Aluno

Aluno.prototype = {
  match: PropTypes.shape({}).isRequired,
}

