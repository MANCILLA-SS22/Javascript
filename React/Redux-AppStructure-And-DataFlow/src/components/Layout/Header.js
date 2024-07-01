import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { postsActions, getCount } from "../../features/posts/postsSlice";

export default function Header(){
    const dispatch = useDispatch();
    const count = useSelector(getCount);

    return (
        <header className="Header">
            <h1>Redux Blog</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="post">Post</Link></li>
                    <li><Link to="user">Users</Link></li>
                </ul>
                <button onClick={() => dispatch(postsActions.increaseCount())}>
                    {count}
                </button>
            </nav>
        </header>
    )
};