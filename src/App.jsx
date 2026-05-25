import { useState } from 'react'
import Encabezado from './componentes/Encabezado'
import Formulario from './componentes/Formulario'
import Lista from './componentes/Lista'
import PiePagina from './componentes/PiePagina'
import './App.css'

// 👉 Cargar datos iniciales desde localStorage
const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || []

function App() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  const [tareas, setTareas] = useState(
    tareasGuardadas.length > 0
      ? tareasGuardadas
      : [
          { id: 1, texto: "Estudiar React", completada: false },
          { id: 2, texto: "Hacer ejercicio", completada: true },
          { id: 3, texto: "Leer 10 páginas", completada: false }
        ]
  )

  // 💾 función auxiliar
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