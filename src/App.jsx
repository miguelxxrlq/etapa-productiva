import { useState } from 'react'
import Encabezado from './componentes/Encabezado'
import Formulario from './componentes/Formulario'
import Lista from './componentes/Lista'
import PiePagina from './componentes/PiePagina'
import './App.css'

function App() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  const [tareas, setTareas] = useState([
    { id: 1, texto: "Estudiar React", completada: false },
    { id: 2, texto: "Hacer ejercicio", completada: true },
    { id: 3, texto: "Leer 10 páginas", completada: false }
  ])

  const agregarTarea = (textoNuevo) => {
    const tareaNueva = {
      id: Date.now(),
      texto: textoNuevo,
      completada: false
    }

    setTareas([...tareas, tareaNueva])
  }

  const eliminarTarea = (idAEliminar) => {
    setTareas(
      tareas.filter(
        tarea => tarea.id !== idAEliminar
      )
    )
  }

  return (
    <div className="app">
      <Encabezado
        titulo="Mis tareas"
        subtitulo="Organiza tu día"
      />

      <button
        onClick={() =>
          setMostrarFormulario(!mostrarFormulario)
        }
        className="button-toggle"
      >
        {mostrarFormulario
          ? 'Ocultar formulario'
          : 'Agregar tarea'}
      </button>

      {mostrarFormulario && (
        <Formulario alAgregar={agregarTarea} />
      )}

      <Lista
        tareas={tareas}
        alEliminar={eliminarTarea}
      />

      <PiePagina />
    </div>
  )
}

export default App