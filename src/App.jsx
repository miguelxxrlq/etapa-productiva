
// App.jsx — el componente principal que reúne todo
import { useState } from 'react'
import Encabezado from './componentes/Encabezado'
import Formulario from './componentes/Formulario'
import Lista from './componentes/Lista'
import Item from './componentes/Item'
import PiePagina from './componentes/PiePagina'
import './App.css' 

function App() {
  const  [mostrarFormulario, setMostrarFormulario] = useState(false) 
  const peliculas =  [ 
    { id: 1, titulo: "Encanto", estrellas: 5, visto: true },
    { id: 2, titulo: "coco", estrellas: 4, visto: true },
    { id: 3, titulo: "soul", estrellas: 5, visto: false }
    ] 
  const tareas =  [ 
    { id: 1, texto: "Estudiarn React", completada: false},
    { id: 2, texto: "Hacer ejercicio", completada: true},
    { id: 3, texto: "Leer 10 paginas", completada: false}
     ]
    const tareaEjemplo = {   
        id: 1,
           texto: "Estudiar React",   
        completada: false
       }   

  return (
    <div className="app">
      <Encabezado 
      titulo="Mis tareas"
      subtitulo="Organiza tu dia"/>
      <button
      onClick={() => setMostrarFormulario(!mostrarFormulario)}
      className='botton-toggle'
      >
      {mostrarFormulario ? 'Ocultar formulario' : 'Agregar tarea' }
      </button>
      
      {mostrarFormulario  && < Formulario />}
      <Lista tareas={tareas}/>
      <Item tarea={tareaEjemplo}/>
      <PiePagina />  
    </div>

  )
}
export default App 
