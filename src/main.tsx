import React, { useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import AppProvider from './context/AppContext';
import AlertsContainer, {
  AlertsContainerRef,
} from './components/Alert/AlertsContainer';

function Root() {
  const alertsRef = React.useRef<AlertsContainerRef>(null);

  return (
    <Router>
      <AppProvider>
        <AlertsContainer ref={alertsRef} />
        <App alertsRef={alertsRef} />
      </AppProvider>
    </Router>
  );
}

const container = document.getElementById('root')!;
ReactDOM.createRoot(container).render(<Root />);
