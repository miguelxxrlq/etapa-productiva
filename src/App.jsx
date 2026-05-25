import { useState } from 'react'
import Encabezado from './componentes/Encabezado'
import Formulario from './componentes/Formulario'
import Lista from './componentes/Lista'
import PiePagina from './componentes/PiePagina'
import './App.css'

// 🧠 Carga segura desde localStorage
function cargarTareasIniciales() {
  try {
    const guardado = localStorage.getItem('tareas')

    if (guardado === null) return []

    return JSON.parse(guardado)
  } catch (error) {
    console.error('Error al cargar tareas:', error)
    return []
  }
}

function App() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  // 📦 Estado inicial desde localStorage
  const [tareas, setTareas] = useState(cargarTareasIniciales)

  // 💾 Guardar siempre en estado + localStorage
  const guardarTareas = (nuevasTareas) => {
    setTareas(nuevasTareas)
    localStorage.setItem('tareas', JSON.stringify(nuevasTareas))
  }

  // ➕ CREATE
  const agregarTarea = (textoNuevo) => {
    const tareaNueva = {
      id: Date.now(),
      texto: textoNuevo,
      completada: false
    }

    guardarTareas([...tareas, tareaNueva])
  }

  // ❌ DELETE
  const eliminarTarea = (idAEliminar) => {
    guardarTareas(
      tareas.filter(tarea => tarea.id !== idAEliminar)
    )
  }

  // 🔁 UPDATE
  const alternarCompletada = (idAAlternar) => {
    guardarTareas(
      tareas.map(tarea =>
        tarea.id === idAAlternar
          ? { ...tarea, completada: !tarea.completada }
          : tarea
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
        alAlternar={alternarCompletada}
      />

      <PiePagina />
    </div>
  )
}

export default App