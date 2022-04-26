import React from 'react';
import { FaHome, FaSignInAlt, FaUserAlt, FaPowerOff} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/modules/auth/actions'
import history from '../../services/history'

import { Nav } from './styled';

function Header() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const nome = useSelector(state => state.auth.user.nome)

  const dispatch = useDispatch();

  const handleLogout = e => {
    e.preventDefault();
    dispatch(actions.loginFailed());
    history.push('/')
  }

  return (
    <Nav >
      <div className='d-flex flex-row justify-content-between'>
        <div>
          <Link to="/">
            <FaHome size={24} />
          </Link>
          <Link to="/register">
            <FaUserAlt size={24} />
          </Link>
        </div>
        <div>
          {isLoggedIn && nome}
          {isLoggedIn ? (
            <Link onClick={handleLogout} to="/login">
              <FaPowerOff size={24} />
            </Link>) : (
            <Link to="/login">
              <FaSignInAlt size={24} />
            </Link>
          )}
        </div>
      </div>
    </Nav>
  );
}

export default Header;
