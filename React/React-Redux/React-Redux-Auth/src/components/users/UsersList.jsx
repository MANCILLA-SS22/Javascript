import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../../features/usersApiSlice";

const UsersList = () => {
    const { data, isLoading, isSuccess, isError, error } = useGetUsersQuery();

    let content;
    if (isLoading) content = <p>"Loading..."</p>;
    if (isError) content = <p>{JSON.stringify(error)}</p>; 
    if (isSuccess) {
        content = (
            <section className="users">
                <h1>Users List</h1>
                <ul>
                    { data.map((user, i) => <li key={i}>{user.username}</li>) }
                </ul>
                <Link to="/welcome">Back to Welcome</Link>
            </section>
        );        
    }

    return content;
}
export default UsersList;