import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectUserById } from '../../features/users/usersSlice';
import { selectPostsByUser } from '../../features/posts/postsSlice';

function UserPage(){
    const { userId } = useParams()
    const user = useSelector(state => selectUserById(state, Number(userId)));
    const postsForUser = useSelector(function (state){
        console.log(state)
        console.log(Number(userId))
        return selectPostsByUser(state, Number(userId))}); //See line 29. There is our past postsForUser variable and the reason why we needed to change it.
    const postTitles = postsForUser.map(post => (
        <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ));

    return (
        <section>
            <h2>{user?.name}</h2>
            <ol>
                {postTitles}
            </ol>
        </section>
    )
}

export default UserPage;

//We select all post with "re returning all posts but it's filtered. So, we're running into a problem whenever we use "fitler" (nothing wrong with "filter") 
//because it just returns a new array every time and useSelector will run every time an action is dispatched, and so when we dispatch that increase count in the Header, then whe useSelector
//runs again and it forces a componenet to re-render if a new value reference is returned. We're returning a new value everu time with filter so that's why we're rendering the UserPage.
//What we really need is a way to only calculate the new filtered array if either state.posts or userId have changed. If they haven't changed, we want to return the same filtered array reference as the last time.
//This idea is called "memoization". We want to save a previous set of inputs and the calculated result, and if the inputs are the same, return the previous result instead of recalculating it again.
//createSelector function that generates memoized selectors that will only recalculate results when the inputs change. 

//To solve this, we need to create a memoized selector (see postSlice.js).
// const postsForUser = useSelector(state => {
//     const allPosts = selectAllPosts(state);
//     return allPosts.filter(event => event.userId === Number(userId));
// });