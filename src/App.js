import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Home,
  About,
  Contact,
  Register,
  Login,
  Dashboard,
  SingleProject,
  SingleBugPage,
  ProtectedRoute,
} from './pages';
import { Navbar, Footer, Sidebar } from './components';
import { useGlobalContext } from './context';

function App() {
  const { user } = useGlobalContext();

  return (
    <BrowserRouter>
      <Navbar />
      <Sidebar />
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={user}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/:id"
            element={
              <ProtectedRoute user={user}>
                <SingleProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/:id/bugs/:bugId"
            element={
              <ProtectedRoute user={user}>
                <SingleBugPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
