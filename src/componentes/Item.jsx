// Item.jsx — representa un solo elemento de la lista
function Item({ tarea }) {
    return (
        <article className="item">
            <h3>{tarea.texto}</h3>
            <p>estado: {tarea.completada ?  'Completada' : 'Pendiente'}</p>
        </article>
    )
}
export default Item 