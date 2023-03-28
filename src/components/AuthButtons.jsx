import styled from 'styled-components';
import { FaUserMinus, FaUserPlus } from 'react-icons/fa';
import { useGlobalContext } from '../context/context';
import { Link } from 'react-router-dom';

const AuthButtons = () => {
  const { user } = useGlobalContext();

  return (
    <Wrapper className="auth-btn-container">
      {user ? (
        <button type="button" className="btn">
          Logout <FaUserMinus />
        </button>
      ) : (
        <Link to="/login" className="btn">
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
