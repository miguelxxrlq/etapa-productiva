import './Item.css'

function Item({ tarea, alEliminar }) {
  return (
    <article className="item">
      <div className="item__contenido">
        <h3 className="item__texto">
          {tarea.texto}
        </h3>

        <p className="item__estado">
          {tarea.completada ? 'Completada' : 'Pendiente'}
        </p>
      </div>

      <div className="item__acciones">
        <button
          className="boton-eliminar"
          onClick={() => alEliminar(tarea.id)}
        >
          ✕
        </button>
      </div>
    </article>
  )
}

export default Item