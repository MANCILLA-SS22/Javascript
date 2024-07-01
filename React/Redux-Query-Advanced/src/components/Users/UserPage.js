import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectUserById } from '../../features/users/usersSlice';
import { useGetPostsByUserIdQuery } from '../../features/posts/postsSlice';

function UserPage(){
    const { userId } = useParams()
    const user = useSelector(state => selectUserById(state, Number(userId)));
    
    const { data, isLoading, isSuccess, isError, error } = useGetPostsByUserIdQuery(userId);
    
    let content;
    if (isLoading) content = <p>Loading...</p>;
    if (isError) content = <p>{error}</p>;
    if (isSuccess) {
        const { ids, entities } = data;
        content = ids.map(id => (
            <li key={id}>
                <Link to={`/post/${id}`}>{entities[id].title}</Link>
            </li>
        ))
    }

    return (
        <section>
            <h2>{user?.name}</h2>
            <ol>
                {content}
            </ol>
        </section>
    )
}

export default UserPage;