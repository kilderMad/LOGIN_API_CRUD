import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa'

import { Container } from '../../styles/globalStyles';
import { AlunoContainer, ProfilePicture } from './styled';
import axios from '../../services/axios';

import Loading from '../../components/Loading/Loading';

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

  return (
    <div>
      <Container>
        <Loading isLoading={isLoading}/>
        <h1>Alunos</h1>
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
                <span>{aluno.email}</span>
                <div>
                  <Link to={`/aluno/${aluno.id}/edit`}>
                    <FaEdit size={16} />
                  </Link>

                  <Link to={`/aluno/${aluno.id}/delete`}>
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
