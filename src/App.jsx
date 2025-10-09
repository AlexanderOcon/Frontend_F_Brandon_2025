import React from 'react';
import './App.css';
import Titulo from './components/Titulo.jsx';
import Mensaje from './components/Mensaje.jsx';

const App = () => {
  return (
    <>
      <h1>Ferreteria El Pez Cuezon 🤡</h1>
      <Titulo />
      <Mensaje/>
    </>
  )
}
export default App;