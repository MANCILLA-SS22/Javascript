import { useFetch } from "../../hooks/useFetch"

function Comments() {

    const {datos} = useFetch([], "https://jsonplaceholder.typicode.com/comments")
    console.log(datos);
    return (
        <div>Comments</div>
    )
}

export default Comments