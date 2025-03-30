import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '/App'
import { MemoryContextProvider } from './context/MemoryContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <MemoryContextProvider>
        <App />
    </MemoryContextProvider>
);