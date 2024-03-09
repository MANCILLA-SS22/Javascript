import "./Header.css"
import { headerInfo } from "./HeaderInfo";

function Header(props){
    return (
        <header>
            <img src={props.imageUrl} alt="Medal badge with a star" />
            <h1>{headerInfo.title}</h1>
            <p>{headerInfo.description}</p>
        </header>
    )
}

export default Header;