import styled from 'styled-components';
import * as colors from '../../config/colors'

export const Form = styled.form`
  div {
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    }
  label {
    margin-bottom: 8px;
  }
  input {
    height: 40px;
    font-size: 18px;
    border: 1px solid #ddd;
    padding: 0 10px;
    border-radius: 6px;

    &:focus {
      border: 1px solid ${colors.primaryDarkColor};
    }
  }

  button {
    margin-top: 15px;
  }
`;
