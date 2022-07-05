import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './components/Navbar/Header';
import Todo from './components/Todo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header/>
    <Todo />
  </React.StrictMode>
);


