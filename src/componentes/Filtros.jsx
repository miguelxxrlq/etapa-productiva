import './Filtros.css'

function Filtros({
  busqueda,
  alCambiarBusqueda,
  filtro,
  alCambiarFiltro
}) {
  return (
    <div className="filtros">
      <div className="filtros__busqueda-wrapper">
        <input
          type="text"
          className="filtros__busqueda"
          value={busqueda}
          onChange={(e) => alCambiarBusqueda(e.target.value)}
          placeholder="Buscar tarea..."
        />

        {/* ❌ Botón limpiar búsqueda */}
        {busqueda && (
          <button
            className="filtros__limpiar"
            onClick={() => alCambiarBusqueda('')}
          >
            ✕
          </button>
        )}
      </div>

      <div className="filtros__botones">
        <button
          className={filtro === 'todas' ? 'activo' : ''}
          onClick={() => alCambiarFiltro('todas')}
        >
          Todas
        </button>

        <button
          className={filtro === 'pendientes' ? 'activo' : ''}
          onClick={() => alCambiarFiltro('pendientes')}
        >
          Pendientes
        </button>

        <button
          className={filtro === 'completadas' ? 'activo' : ''}
          onClick={() => alCambiarFiltro('completadas')}
        >
          Completadas
        </button>
      </div>
    </div>
  )
}

export default Filtros