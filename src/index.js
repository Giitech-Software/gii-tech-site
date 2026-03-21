import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { DarkModeProvider } from './context/DarkModeContext'; // ✅ Add this

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <DarkModeProvider> {/* ✅ Wrap App with DarkModeProvider */}
          <App />
        </DarkModeProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
