import "./Concepts.css";
import ConceptItem from "./ConceptItem";

function Concepts(props){
    return (
        <ul id="concepts">
            {props.data?.map(function(item){
                return <ConceptItem key={item.title} title={item.title} imageUrl={item.image} description={item.description} />;
            })}
        </ul>
    )
}

export default Concepts;