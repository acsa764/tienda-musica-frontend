import React, { useState, useEffect } from 'react';
import { api } from '../api';

function FormularioVenta() {
  const [formData, setFormData] = useState({
    cliente_nombre: '',
    producto_id: '',
    cantidad: '',
    fecha: ''
  });
  
  // Lista con 20 instrumentos musicales diferentes para poblar el catálogo de la tienda
  const [productos, setProductos] = useState([
    { id: '1', nombre: 'Guitarra Acústica', precio: 150 },
    { id: '2', nombre: 'Guitarra Eléctrica', precio: 300 },
    { id: '3', nombre: 'Bajo Eléctrico', precio: 250 },
    { id: '4', nombre: 'Batería Acústica', precio: 600 },
    { id: '5', nombre: 'Teclado Sintetizador', precio: 350 },
    { id: '6', nombre: 'Piano Eléctrico', precio: 500 },
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
    // Si tu API tiene productos guardados, intentará cargarlos. 
    // Si falla o está vacía, se mantendrán los 20 instrumentos de arriba.
    api.get('/productos')
      .then(res => {
        if(res.data && res.data.length > 0) {
          setProductos(res.data);
        }
      })
      .catch(err => console.error("Usando instrumentos locales por defecto:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mapeamos los datos para enviarlos al servidor de forma organizada
    const dataParaEnviar = {
      estudiante_id: formData.cliente_nombre, // Enviamos el nombre escrito en el campo de texto
      producto_id: formData.producto_id,
      cantidad: formData.cantidad,
      fecha: formData.fecha
    };

    api.post('/ventas', dataParaEnviar)
      .then(res => {
        alert(res.data.message || 'Venta registrada con éxito');
        setFormData({ cliente_nombre: '', producto_id: '', cantidad: '', fecha: '' });
      })
      .catch(err => console.error('Error al registrar la transacción:', err));
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
    color: '#680000',
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
    background: 'linear-gradient(135deg, #bb0000, #4b0000)',
    color: 'white',
    padding: '12px 20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '0.95rem'
  };

  return (
    <div style={cardStyle}>
      <h2 style={titleStyle}>Registrar Nueva Venta de Instrumentos</h2>
      <form onSubmit={handleSubmit} style={formGridStyle}>
        
        {/* Ahora es un input de texto para escribir el nombre en lugar de un select */}
        <input 
          type="text" 
          name="cliente_nombre" 
          placeholder="Nombre del Cliente / Comprador" 
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
        
        <input type="number" name="cantidad" placeholder="Cantidad" min="1" value={formData.cantidad} onChange={handleChange} required style={inputStyle} />
        <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required style={inputStyle} />
        <button type="submit" style={buttonStyle}>Registrar Venta</button>
      </form>
    </div>
  );
}

export default FormularioVenta;
