import React from 'react';
import { get } from 'lodash'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/globalStyles';
import { Title, Form} from './styled'
import axios from '../../services/axios'
import history from  '../../services/history'
import * as actions from '../../store/modules/auth/actions'

function Fotos({ match }) {
  const [foto, setFoto] = React.useState('')
  const id = get(match, 'params.id', '')
  const dispatch = useDispatch();

  React.useEffect(()=>{

    const getData = async () =>{
      try {
        const {data} = await axios.get(`/alunos/${id}`)
        setFoto(get(data, 'Fotos[0].url', ''))
      } catch (err) {
        toast.error('Error ao obter imagem')
        history.push('/')
      }
    }

    getData()
  }, [id]);

  const handleChange = async e => {
    const file = e.target.files[0]
    const fotoURL = URL.createObjectURL(file);


    setFoto(fotoURL);

    const formData = new FormData();
    formData.append('aluno_id', id)
    formData.append('foto', file)

    try {
      await axios.post('/file/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Foto Enviada')
    } catch (err) {
      const { status } = get(err, 'response', '')
      toast.error('Error ao enviar foto')

      if(status === 401) dispatch(actions.loginFailed())
    }
  }

  return (
    <div>
      <Container>
        <Title>Fotos</Title>

        <Form>
          <label htmlFor='foto'>
            {foto? <img src={foto} alt='Foto' crossOrigin=""/> : 'Selecionar'}
            <input type='file' id='foto' onChange={handleChange} />
          </label>
        </Form>
      </Container>
    </div>
  );
}


export default Fotos

