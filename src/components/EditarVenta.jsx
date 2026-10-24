import React, { useState, useEffect } from 'react';
import { api } from '../api';

function EditarVenta({ venta, onUpdate }) {
  const [formData, setFormData] = useState({
    estudiante_id: venta.estudiante_id,
    producto_id: venta.producto_id,
    cantidad: venta.cantidad,
    fecha: venta.fecha
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
    api.put(`/ventas/${venta.id}`, formData)
      .then(res => {
        alert(res.data.message);
        onUpdate();
      })
      .catch(err => console.error('Error updating resource row:', err));
  };

  const editContainerStyle = {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: '#1f202c',
    borderRadius: '8px',
    border: '1px dashed #00f2fe'
  };

  const titleStyle = {
    color: '#9b51e0',
    fontSize: '1.2rem',
    marginTop: '0',
    marginBottom: '15px'
  };

  const formGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '12px',
    alignItems: 'center'
  };

  const inputStyle = {
    backgroundColor: '#0d0e12',
    color: '#ffffff',
    border: '1px solid #2d3748',
    padding: '10px',
    borderRadius: '6px',
    fontSize: '0.9rem',
    outline: 'none'
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #9b51e0, #00f2fe)',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '0.9rem'
  };

  return (
    <div style={editContainerStyle}>
      <h3 style={titleStyle}>Corregir Ticket de Venta</h3>
      <form onSubmit={handleSubmit} style={formGridStyle}>
        <select name="estudiante_id" value={formData.estudiante_id} onChange={handleChange} required style={inputStyle}>
          {estudiantes.map(e => (
            <option key={e.id} value={e.id}>{e.nombre} - {e.grupo}</option>
          ))}
        </select>
        <select name="producto_id" value={formData.producto_id} onChange={handleChange} required style={inputStyle}>
          {productos.map(p => (
            <option key={p.id} value={p.id}>{p.nombre} - \${p.precio}</option>
          ))}
        </select>
        <input type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} required style={inputStyle} />
        <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required style={inputStyle} />
        <button type="submit" style={buttonStyle}>Actualizar Venta</button>
      </form>
    </div>
  );
}

export default EditarVenta;
