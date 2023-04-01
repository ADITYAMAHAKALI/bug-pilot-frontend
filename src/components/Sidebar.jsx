import logo from '../assets/logo.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { useGlobalContext, useAuthContext } from '../context';
import AuthButtons from './AuthButtons';

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useGlobalContext();
  const { user } = useAuthContext();

  const sidebarLinks = [
    {
      id: 1,
      text: `${user ? 'dashboard' : 'home'}`,
      url: `${user ? '/dashboard' : '/'}`,
    },
    {
      id: 2,
      text: 'about',
      url: '/about',
    },
    {
      id: 3,
      text: 'contact',
      url: '/contact',
    },
  ];

  return (
    <SidebarContainer>
      <aside className={`sidebar ${isSidebarOpen ? 'show-sidebar' : null}`}>
        {/* header */}
        <div className="sidebar-header">
          <Link to="/dashboard" className="nav-logo" onClick={closeSidebar}>
            <img src={logo} alt="logo" className="logo" />
          </Link>
          <button className="close-btn" onClick={closeSidebar}>
            <FaTimes />
          </button>
        </div>

        {/* links */}
        <ul className="links">
          {sidebarLinks.map(({ id, text, url }) => (
            <li key={id} onClick={closeSidebar}>
              <Link to={url}>{text}</Link>
            </li>
          ))}
        </ul>

        <AuthButtons />
      </aside>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  text-align: center;
  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
  }
  .close-btn {
    font-size: 2rem;
    background: transparent;
    border-color: transparent;
    color: var(--primary-5);
    transition: var(--transition);
    cursor: pointer;
    color: var(--red-dark);
    margin-top: 0.2rem;
  }
  .close-btn:hover {
    color: var(--red-light);
  }
  .nav-logo {
    display: flex;
  }
  .logo {
    justify-self: center;
  }
  .links {
    margin-bottom: 2rem;
  }
  .links a {
    display: block;
    text-align: left;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 1rem 1.5rem;
    color: var(--grey-7);
    transition: var(--transition);
    letter-spacing: var(--letterSpacing);
  }

  .links a:hover {
    padding: 1rem 1.5rem;
    padding-left: 2rem;
    background: var(--grey-2);
    color: var(--grey-9);
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--white);
    transition: var(--transition);
    transform: translate(-100%);
    z-index: -1;
  }
  .show-sidebar {
    transform: translate(0);
    z-index: 999;
  }
  .auth-btn-container {
    margin: 2rem auto;
  }

  @media screen and (min-width: 992px) {
    .sidebar {
      display: none;
    }
  }
`;

export default Sidebar;
