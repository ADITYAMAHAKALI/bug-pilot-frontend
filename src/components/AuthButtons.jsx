import styled from 'styled-components';
import { FaUserMinus, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useGlobalContext, useAuthContext } from '../context';

const AuthButtons = () => {
  const { closeSidebar } = useGlobalContext();
  const { user, handleLogout } = useAuthContext();

  return (
    <Wrapper className="auth-btn-container">
      {user ? (
        <Link to="/" className="btn" onClick={handleLogout}>
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
