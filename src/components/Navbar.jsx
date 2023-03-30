import styled from 'styled-components';
import logo from '../assets/logo.png';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { links } from '../utils/constants';
import { useGlobalContext } from '../context/context';
import AuthButtons from './AuthButtons';

const Nav = () => {
  const { openSidebar } = useGlobalContext();

  return (
    <NavContainer>
      <div className="nav-center">
        {/* nav-header */}
        <div className="nav-header">
          <Link to="/dashboard" className="nav-logo">
            <img src={logo} alt="logo" />
          </Link>
          <button type="button" className="nav-toggle" onClick={openSidebar}>
            <FaBars />
          </button>
        </div>

        {/* nav-links */}
        <ul className="nav-links">
          {links.map(({ id, text, url }) => (
            <li key={id}>
              <Link to={url}>{text}</Link>
            </li>
          ))}
        </ul>

        <AuthButtons />
      </div>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--maxWidth);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .nav-logo {
    display: flex;
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }
  .auth-btn-container {
    display: none;
  }

  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--primary-6);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--letterSpacing);
        padding: 0.5rem;
        &:hover {
          border-bottom: 1px solid var(--primary-7);
        }
      }
    }
    .auth-btn-container {
      display: block;
    }
  }
`;

export default Nav;
