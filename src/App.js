import { Routes, Route } from 'react-router-dom';
import {
  Home,
  About,
  Contact,
  Register,
  Login,
  Dashboard,
  SingleProjectBugs,
  SingleBugDetails,
  ProtectedRoute,
} from './pages';
import { Navbar, Footer, Sidebar } from './components';

function App() {
  return (
    <>
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
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <ProtectedRoute>
                <SingleProjectBugs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/:id/bugs/:bugId"
            element={
              <ProtectedRoute>
                <SingleBugDetails />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
