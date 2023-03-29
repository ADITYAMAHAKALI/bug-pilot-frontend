import React from 'react';
import ReactDOM from 'react-dom/client';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { AppProvider, ProjectProvider } from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
      <ProjectProvider>
        <App />
      </ProjectProvider>
    </AppProvider>
  </React.StrictMode>
);
