import styled from 'styled-components';
import { FaUserMinus, FaUserPlus } from 'react-icons/fa';
import { useGlobalContext } from '../context/context';
import { useNavigate, Link } from 'react-router-dom';

const AuthButtons = () => {
  const { user, setUser, closeSidebar } = useGlobalContext();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    closeSidebar();
  };

  return (
    <Wrapper className="auth-btn-container">
      {user ? (
        <Link to="/" className="btn" onClick={logout}>
          Logout <FaUserMinus />
        </Link>
      ) : (
        <Link to="/login" className="btn" onClick={closeSidebar}>
          Login <FaUserPlus />
        </Link>
      )}
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  display: grid;
  place-items: center;
`;

export default AuthButtons;
