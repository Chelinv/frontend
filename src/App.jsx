import React, { useState, useEffect } from 'react';
import './App.css';
{/*const API_URL = 'http://127.0.0.1:5000/alumnos';*/}
const API_URL = 'https://backensinbbdd.vercel.app/alumnos';


function App() {
  const [alumnos, setAlumnos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [cal1, setCal1] = useState('');
  const [cal2, setCal2] = useState('');
  const [cal3, setCal3] = useState('');

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setAlumnos(data);
      } catch (error) {
        console.error('Error al obtener los alumnos:', error);
      }
    };

    fetchAlumnos();
  }, []);

  const handleAgregarAlumno = async () => {
    if (!nombre || !cal1 || !cal2 || !cal3) {
      alert('Todos los campos son necesarios');
      return;
    }

    const alumno = {
      nombre,
      cal1: Number(cal1),
      cal2: Number(cal2),
      cal3: Number(cal3),
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alumno),
      });

      const newAlumno = await response.json();
      setAlumnos([...alumnos, newAlumno]);
      setNombre('');
      setCal1('');
      setCal2('');
      setCal3('');
    } catch (error) {
      console.error('Error al agregar alumno:', error);
    }
  };

  return (
    <div className="App">
      <h1>Lista de Alumnos</h1>
      <ul>
        {alumnos.map((alumno, index) => (
          <li key={index}>
            {alumno.nombre} - {alumno.calFinal} - {alumno.observacion}
          </li>
        ))}
      </ul>

      <h2>Agregar Alumno</h2>
      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre"
      />
      <input
        value={cal1}
        onChange={(e) => setCal1(e.target.value)}
        type="number"
        placeholder="Calificación 1"
      />
      <input
        value={cal2}
        onChange={(e) => setCal2(e.target.value)}
        type="number"
        placeholder="Calificación 2"
      />
      <input
        value={cal3}
        onChange={(e) => setCal3(e.target.value)}
        type="number"
        placeholder="Calificación 3"
      />
      <button onClick={handleAgregarAlumno}>Agregar</button>
    </div>
  );
}

export default App;
