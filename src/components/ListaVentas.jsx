import React, { useEffect, useState } from 'react';
import { api } from '../api';
import EditarVenta from './EditarVenta';

function ListaVentas() {
  const [ventas, setVentas] = useState([]);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  const cargarVentas = () => {
    api.get('/ventas')
      .then(res => setVentas(res.data))
      .catch(err => console.error('Error fetching data:', err));
  };

  useEffect(() => {
    cargarVentas();
  }, []);

  const eliminarVenta = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar esta venta?')) {
      api.delete(`/ventas/${id}`)
        .then(res => {
          alert(res.data.message);
          cargarVentas();
        })
        .catch(err => console.error('Error clearing data rows:', err));
    }
  };

  const cardStyle = {
    backgroundColor: '#181922',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
    border: '1px solid rgba(255, 255, 255, 0.05)'
  };

  const titleStyle = {
    color: '#a10000',
    fontSize: '1.4rem',
    marginTop: '0',
    marginBottom: '20px',
    borderBottom: '2px solid #2d3748',
    paddingBottom: '10px'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#0d0e12',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #2d3748'
  };

  const thStyle = {
    backgroundColor: '#1f202c',
    color: '#ad0000',
    padding: '14px',
    textAlign: 'left',
    fontWeight: '600',
    textTransform: 'uppercase',
    fontSize: '0.85rem',
    borderBottom: '2px solid #2d3748'
  };

  const tdStyle = {
    padding: '14px',
    color: '#ffffff',
    borderBottom: '1px solid #2d3748',
    fontSize: '0.95rem'
  };

  const editBtnStyle = {
    background: 'linear-gradient(135deg, #a30808, #410000)',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '8px',
    fontWeight: 'bold'
  };

  const deleteBtnStyle = {
    backgroundColor: '#e53e3e',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  };

  return (
    <div style={cardStyle}>
      <h2 style={titleStyle}>Historial de Transacciones de la Tienda</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            {/* Cambiado para reflejar únicamente al Cliente final */}
            <th style={thStyle}>Cliente</th>
            <th style={thStyle}>Artículo Musical</th>
            <th style={thStyle}>Cantidad</th>
            <th style={thStyle}>Precio</th>
            <th style={thStyle}>Total</th>
            <th style={thStyle}>Fecha</th>
            <th style={thStyle}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map(v => (
            <tr key={v.id}>
              {/* Muestra el nombre escrito; evalúa ambas opciones por compatibilidad con tu backend */}
              <td style={tdStyle}>{v.estudiante || v.estudiante_id}</td>
              <td style={tdStyle}>{v.producto}</td>
              <td style={tdStyle}>{v.cantidad}</td>
              <td style={tdStyle}>${v.precio}</td>
              <td style={tdStyle}>${v.total}</td>
              {/* Formatea la fecha para que visualmente se vea limpia en la tabla */}
              <td style={tdStyle}>{v.fecha ? v.fecha.split('T')[0] : ''}</td>
              <td style={tdStyle}>
                <button onClick={() => setVentaSeleccionada(v)} style={editBtnStyle}>Editar</button>
                <button onClick={() => eliminarVenta(v.id)} style={deleteBtnStyle}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {ventaSeleccionada && (
        <EditarVenta 
          venta={ventaSeleccionada} 
          onUpdate={() => { 
            setVentaSeleccionada(null); 
            cargarVentas(); 
          }} 
        />
      )}
    </div>
  );
}

export default ListaVentas;
