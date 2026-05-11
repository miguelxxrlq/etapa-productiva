// Item.jsx — representa un solo elemento de la lista
function Item({ tarea }) {
    return (
        <article className="item">
            <h3 className="item_texto">{tarea.texto}</h3>
            <p className="item_estado">estado: {tarea.completada ?  'Completada' : 'Pendiente'}</p>
        </article>
    )
}
export default Item 