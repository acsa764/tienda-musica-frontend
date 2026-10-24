import React, { useState, useEffect } from 'react';
import { api } from '../api';

function FormularioVenta() {
  const [formData, setFormData] = useState({
    estudiante_id: '',
    producto_id: '',
    cantidad: '',
    fecha: ''
  });
  const [estudiantes, setEstudiantes] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    api.get('/estudiantes')
      .then(res => setEstudiantes(res.data))
      .catch(err => console.error(err));
    api.get('/productos')
      .then(res => setProductos(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/ventas', formData)
      .then(res => {
        alert(res.data.message);
        setFormData({ estudiante_id: '', producto_id: '', cantidad: '', fecha: '' });
      })
      .catch(err => console.error('Error registering transaction:', err));
  };

  const cardStyle = {
    backgroundColor: '#181922',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    marginBottom: '40px'
  };

  const titleStyle = {
    color: '#00f2fe',
    fontSize: '1.4rem',
    marginTop: '0',
    marginBottom: '20px',
    borderBottom: '2px solid #2d3748',
    paddingBottom: '10px'
  };

  const formGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    alignItems: 'center'
  };

  const inputStyle = {
    backgroundColor: '#0d0e12',
    color: '#ffffff',
    border: '1px solid #2d3748',
    padding: '12px',
    borderRadius: '6px',
    fontSize: '0.95rem',
    outline: 'none'
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #00f2fe, #9b51e0)',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '0.95rem'
  };

  return (
    <div style={cardStyle}>
      <h2 style={titleStyle}>Registrar Nueva Venta de Instrumentos</h2>
      <form onSubmit={handleSubmit} style={formGridStyle}>
        <select name="estudiante_id" value={formData.estudiante_id} onChange={handleChange} required style={inputStyle}>
          <option value="">Seleccione Vendedor / Cliente</option>
          {estudiantes.map(e => (
            <option key={e.id} value={e.id}>{e.nombre} - {e.grupo}</option>
          ))}
        </select>
        <select name="producto_id" value={formData.producto_id} onChange={handleChange} required style={inputStyle}>
          <option value="">Seleccione Artículo Musical</option>
          {productos.map(p => (
            <option key={p.id} value={p.id}>{p.nombre} - ${p.precio}</option>
          ))}
        </select>
        <input type="number" name="cantidad" placeholder="Cantidad" value={formData.cantidad} onChange={handleChange} required style={inputStyle} />
        <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required style={inputStyle} />
        <button type="submit" style={buttonStyle}>Registrar Venta</button>
      </form>
    </div>
  );
}

export default FormularioVenta;
