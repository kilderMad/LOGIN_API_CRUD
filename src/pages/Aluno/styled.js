import styled from 'styled-components';

export const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  input{
    height: 40px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0 10px;
  }
`;

export const ProfilePicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;

  img{
    width: 180px;
    height: 180px;
  }

  a{
    display: flex;
    align-self: end;
    justify-content: center;
    border: none;
    position: absolute;
    padding-bottom: 5px;
  }

  .iconBlack{
    color: black;
  }
`;
