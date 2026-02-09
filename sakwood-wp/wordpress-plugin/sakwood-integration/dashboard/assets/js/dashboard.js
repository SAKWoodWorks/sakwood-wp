import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/Layout/App';

// Initialize React app
const container = document.getElementById('sakwood-dashboard-root');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
