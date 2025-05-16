import React from 'react';
import { createRoot } from 'react-dom/client';

import Filter from './features/filter/Filter';
import { ReactNotifications } from 'react-notifications-component'


function App() {
  return (
    <div>
        <ReactNotifications></ReactNotifications>
        <Filter></Filter>
        Ok then
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
