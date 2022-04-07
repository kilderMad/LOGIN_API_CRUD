import { createGlobalStyle } from 'styled-components';
import { primaryDarkColor, primaryColor, errorColor, sussessColor } from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

export default createGlobalStyle`

*{
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  background-color: ${primaryDarkColor} ;
  color: ${primaryColor};
}

body, html, #root {
  height: 100% ;
}

button {
  cursor: pointer;
  background: ${primaryColor};
  border:none ;
  color: #fff;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
}

a{
  text-decoration: ${primaryColor};
  color: #fff;
  cursor: pointer;
}

ul{
  list-style: none ;
}

body .Toastify .Toastify__toast-container .Toastify__toast--success {
  background-color: ${sussessColor};
}

body .Toastify .Toastify__toast-container .Toastify__toast--error {
  background-color: ${errorColor};
}
`;

export const Container = styled.section`
  max-width: 500px;
  background-color: #fff;
  margin: 30px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: o o 10px rgba(0, 0, 0, 0.1);
`;

