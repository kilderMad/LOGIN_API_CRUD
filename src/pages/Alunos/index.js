import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa'

import { Container } from '../../styles/globalStyles';
import { AlunoContainer, ProfilePicture, NovoALuno } from './styled';
import axios from '../../services/axios';

import Loading from '../../components/Loading/Loading';
import { toast } from 'react-toastify';

function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=> {
    async function getData(){
      setIsLoading(true)
      const response = await axios.get('/alunos')
      setAlunos(response.data)
      setIsLoading(false)
    }

    getData()
  },[])

  const handDeleteAsk = async (e, id) => {
    e.preventDefault();
    e.persist()
    try {
      await axios.delete(`/alunos/${id}`)
      e.target.parentElement.remove();
    } catch (e) {
      const errors = get(e, 'response.data.errors', [])
      errors.map(error => toast.error(error))
    }
  }

  return (
    <div>
      <Container>
        <Loading isLoading={isLoading}/>
        <h1>Alunos</h1>
        <NovoALuno to="/aluno/"> Novo aluno</NovoALuno>
        <AlunoContainer>
          {alunos.map(aluno => (
            <div key={String(aluno.id)}>
                <ProfilePicture>
                  {get(aluno, 'Fotos[0].url', false) ? (
                    <img crossOrigin='' src={aluno.Fotos[0].url} alt=''/>
                  ) : (
                    <FaUserCircle size={36}/>
                  )}
                </ProfilePicture>
                <span>{aluno.nome}</span>
                <span>{aluno.sobrenome}</span>
                <span>{aluno.email}</span>
                <div>
                  <Link to={`/aluno/${aluno.id}/edit`}>
                    <FaEdit size={16} />
                  </Link>

                  <Link onClick={e => handDeleteAsk(e, aluno.id)} to={`/alunos/`}>
                    <FaWindowClose size={16} />
                  </Link>
                </div>
            </div>
          ))}
        </AlunoContainer>
      </Container>
    </div>
  );
}


export default Alunos

