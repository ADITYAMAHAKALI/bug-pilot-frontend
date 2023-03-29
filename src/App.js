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
} from './pages';
import { Navbar, Footer, Sidebar } from './components';

function App() {
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:id" element={<SingleProject />} />
          <Route
            path="/dashboard/:id/bugs/:bugId"
            element={<SingleBugPage />}
          />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
