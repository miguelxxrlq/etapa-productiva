import { useState } from 'react'
import Encabezado from './componentes/Encabezado'
import Formulario from './componentes/Formulario'
import Lista from './componentes/Lista'
import Filtros from './componentes/Filtros'
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

  const [tareas, setTareas] = useState(cargarTareasIniciales)

  // 🔎 Estados de filtros
  const [busqueda, setBusqueda] = useState("")
  const [filtro, setFiltro] = useState("todas") // todas | pendientes | completadas

  // 💾 Guardar en estado + localStorage
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

  // 🔍 FILTRO + BÚSQUEDA
  const tareasFiltradas = tareas
    .filter(tarea => {
      if (filtro === "pendientes") return !tarea.completada
      if (filtro === "completadas") return tarea.completada
      return true
    })
    .filter(tarea =>
      tarea.texto.toLowerCase().includes(busqueda.toLowerCase())
    )

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

      {/* ➕ FORMULARIO */}
      {mostrarFormulario && (
        <Formulario alAgregar={agregarTarea} />
      )}

      {/* 🔎 FILTROS */}
      <Filtros
        busqueda={busqueda}
        alCambiarBusqueda={setBusqueda}
        filtro={filtro}
        alCambiarFiltro={setFiltro}
      />

      {/* 📋 LISTA FILTRADA */}
      <Lista
        tareas={tareasFiltradas}  // 👈 IMPORTANTE
        alEliminar={eliminarTarea}
        alAlternar={alternarCompletada}
      />

      <PiePagina />
    </div>
  )
}

export default App