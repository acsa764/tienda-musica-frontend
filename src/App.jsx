import React from 'react';
import ListaVentas from './components/ListaVentas';
import FormularioVenta from './components/FormularioVenta';

function App() {
  const containerStyle = {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '40px 20px',
    backgroundColor: '#0d0e12',
    minHeight: '100vh',
    color: '#ffffff',
    fontFamily: "'Segoe UI', Roboto, sans-serif"
  };

  const headerStyle = {
    textAlign: 'center',
    fontSize: '2.8rem',
    background: 'linear-gradient(135deg, #00f2fe, #9b51e0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '40px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontWeight: 'bold'
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Kira Music Store</h1>
      <FormularioVenta />
      <ListaVentas />
    </div>
  );
}

export default App;
