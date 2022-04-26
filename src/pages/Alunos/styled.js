import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AlunoContainer = styled.div`
  margin-top: 20px;
  color: black;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;

  }
  div + div {
    border-top: 1px solid #eee;
  }

  a {
    color: black;
    margin-right: 10px;
  }
`;

export const ProfilePicture = styled.div`
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
  span {
    margin: 0 10px;
  }
`;

export const NovoALuno = styled(Link)`
  display: block;
  padding-top: 20px;
  color: black
`;
