import { useState } from 'react'
import Encabezado from './componentes/Encabezado'
import Formulario from './componentes/Formulario'
import Lista from './componentes/Lista'
import Filtros from './componentes/Filtros'
import PiePagina from './componentes/PiePagina'
import './App.css'

// 🧠 cargar localStorage
function cargarTareasIniciales() {
  try {
    const datos = localStorage.getItem('tareas')
    if (!datos) return []
    return JSON.parse(datos)
  } catch {
    return []
  }
}

function App() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [tareas, setTareas] = useState(cargarTareasIniciales)

  const [busqueda, setBusqueda] = useState("")
  const [filtro, setFiltro] = useState("todas")
  const [darkMode, setDarkMode] = useState(false)

  // 💾 persistencia segura
  const guardarTareas = (actualizar) => {
    setTareas(prev => {
      const nuevas =
        typeof actualizar === "function"
          ? actualizar(prev)
          : actualizar

      localStorage.setItem('tareas', JSON.stringify(nuevas))
      return nuevas
    })
  }

  // ➕ agregar
  const agregarTarea = (texto) => {
    if (!texto.trim()) return

    const nueva = {
      id: Date.now(),
      texto,
      completada: false
    }

    guardarTareas(prev => [...prev, nueva])
  }

  // ❌ eliminar
  const eliminarTarea = (id) => {
    guardarTareas(prev => prev.filter(t => t.id !== id))
  }

  // 🔁 alternar
  const alternarCompletada = (id) => {
    guardarTareas(prev =>
      prev.map(t =>
        t.id === id
          ? { ...t, completada: !t.completada }
          : t
      )
    )
  }

  // 🔍 filtros
  const tareasFiltradas = tareas
    .filter(t => {
      if (filtro === "pendientes") return !t.completada
      if (filtro === "completadas") return t.completada
      return true
    })
    .filter(t =>
      t.texto.toLowerCase().includes(busqueda.toLowerCase())
    )

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>

      <Encabezado
        titulo="Mis tareas"
        subtitulo="Organiza tu día"
      />

      {/* BOTONES SUPERIORES */}
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button
          className="button-toggle"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          {mostrarFormulario ? "Ocultar formulario" : "Agregar tarea"}
        </button>

        <button
          className="button-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Claro" : "🌙 Oscuro"}
        </button>
      </div>

      {/* FORMULARIO */}
      {mostrarFormulario && (
        <Formulario alAgregar={agregarTarea} />
      )}

      {/* FILTROS */}
      <Filtros
        busqueda={busqueda}
        alCambiarBusqueda={setBusqueda}
        filtro={filtro}
        alCambiarFiltro={setFiltro}
      />

      {/* LISTA */}
      <Lista
        tareas={tareasFiltradas}
        alEliminar={eliminarTarea}
        alAlternar={alternarCompletada}
      />

      <PiePagina />
    </div>
  )
}

export default App