import "./ConceptItem.css";

function ConceptItem(props){
    return (
        <li className="concept">
            <img src={props.imageUrl} alt={props.title} />
            <h2>{props.title}</h2>
            <p>{props.description}</p>
        </li>
    )
}

export default ConceptItem;