import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import {
  AppProvider,
  AuthProvider,
  ProjectProvider,
  BugsProvider,
} from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
      <Router>
        <AuthProvider>
          <ProjectProvider>
            <BugsProvider>
              <App />
            </BugsProvider>
          </ProjectProvider>
        </AuthProvider>
      </Router>
    </AppProvider>
  </React.StrictMode>
);
