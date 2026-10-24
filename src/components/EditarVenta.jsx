import React, { useState, useEffect } from 'react';
import { api } from '../api';

function EditarVenta({ venta, onUpdate }) {
  // Inicializamos el estado usando los datos de la venta seleccionada para editar
  const [formData, setFormData] = useState({
    cliente_nombre: venta.estudiante_id || '', // Cargamos el nombre que ya estaba guardado
    producto_id: venta.producto_id || '',
    cantidad: venta.cantidad || '',
    fecha: venta.fecha ? venta.fecha.split('T')[0] : '' // Limpia el formato de fecha si viene con hora de la BD
  });

  // El catálogo con los mismos 20 instrumentos de tu tienda de música
  const [productos, setProductos] = useState([
    { id: '1', nombre: 'Guitarra Acústica', precio: 150 },
    { id: '2', nombre: 'Guitarra Eléctrica', precio: 300 },
    { id: '3', nombre: 'Bajo Eléctrico', precio: 250 },
    { id: '4', nombre: 'Batería Acústica', precio: 600 },
    { id: '5', nombre: 'Teclado Sintetizador', precio: 350 },
    { id: '6', height: '', nombre: 'Piano Eléctrico', precio: 500 },
    { id: '7', nombre: 'Violín 4/4', precio: 120 },
    { id: '8', nombre: 'Ukulele Soprano', precio: 45 },
    { id: '9', nombre: 'Flauta Transversa', precio: 180 },
    { id: '10', nombre: 'Saxofón Alto', precio: 450 },
    { id: '11', nombre: 'Trompeta en Sib', precio: 280 },
    { id: '12', nombre: 'Clarinete', precio: 200 },
    { id: '13', nombre: 'Cajón Peruano', precio: 80 },
    { id: '14', nombre: 'Bongoes', precio: 70 },
    { id: '15', nombre: 'Micrófono de Condensador', precio: 110 },
    { id: '16', nombre: 'Amplificador de Guitarra', precio: 140 },
    { id: '17', nombre: 'Pedal de Efectos (Distorsión)', precio: 65 },
    { id: '18', nombre: 'Mesa de Mezclas 4 Ch', precio: 130 },
    { id: '19', nombre: 'Audífonos de Monitoreo', precio: 90 },
    { id: '20', nombre: 'Platillos Crash 16"', precio: 115 }
  ]);

  useEffect(() => {
    // Si tu API tiene productos, los carga para actualizar precios o catálogo de la BD
    api.get('/productos')
      .then(res => {
        if(res.data && res.data.length > 0) {
          setProductos(res.data);
        }
      })
      .catch(err => console.error('Usando instrumentos locales en edición:', err));
  }, []);

  // Sincroniza el formulario si el usuario selecciona una venta diferente para editar
  useEffect(() => {
    setFormData({
      cliente_nombre: venta.estudiante_id || '',
      producto_id: venta.producto_id || '',
      cantidad: venta.cantidad || '',
      fecha: venta.fecha ? venta.fecha.split('T')[0] : ''
    });
  }, [venta]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mapeamos los datos para que sigan la estructura que espera tu backend
    const dataParaEnviar = {
      estudiante_id: formData.cliente_nombre, // Enviamos el texto modificado como el ID esperado por tu servidor
      producto_id: formData.producto_id,
      cantidad: formData.cantidad,
      fecha: formData.fecha
    };

    api.put(`/ventas/${venta.id}`, dataParaEnviar)
      .then(res => {
        alert(res.data.message || 'Venta actualizada con éxito');
        onUpdate(); // Refresca la lista general de ventas en el componente padre
      })
      .catch(err => console.error('Error al actualizar la venta:', err));
  };

  const editContainerStyle = {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: '#1f202c',
    borderRadius: '8px',
    border: '1px dashed #770000'
  };

  const titleStyle = {
    color: '#b80c0c',
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
    background: 'linear-gradient(135deg, #c70000, #270000)',
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
        
        {/* Cambiado de <select> a un input de texto idéntico al formulario de registro */}
        <input 
          type="text" 
          name="cliente_nombre" 
          placeholder="Nombre del Cliente" 
          value={formData.cliente_nombre} 
          onChange={handleChange} 
          required 
          style={inputStyle} 
        />

        <select name="producto_id" value={formData.producto_id} onChange={handleChange} required style={inputStyle}>
          <option value="">Seleccione Artículo Musical</option>
          {productos.map(p => (
            <option key={p.id} value={p.id}>{p.nombre} - ${p.precio}</option>
          ))}
        </select>
        
        <input type="number" name="cantidad" min="1" value={formData.cantidad} onChange={handleChange} required style={inputStyle} />
        <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required style={inputStyle} />
        <button type="submit" style={buttonStyle}>Actualizar Venta</button>
      </form>
    </div>
  );
}

export default EditarVenta;
