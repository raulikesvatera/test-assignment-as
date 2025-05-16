import React from 'react';
import { createRoot } from 'react-dom/client';
import Filter from './features/filter/Filter';
import { ReactNotifications } from 'react-notifications-component'
import { Provider } from 'react-redux';
import store from './store';

import './styles/bulma.scss';
import './styles/app.css';
import 'react-notifications-component/dist/theme.css'

function App() {
  return (
    <div className="section">
        <div className="container">
            <Provider store={store}>
                <ReactNotifications></ReactNotifications>
                <Filter></Filter>
            </Provider>
        </div>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
