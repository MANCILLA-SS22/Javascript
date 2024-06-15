import { useDispatch } from "react-redux";
import { postsActions } from "../../features/posts/postsSlice";

const reactionEmoji = { thumbsUp: '👍', wow: '😮', heart: '❤️', rocket: '🚀', coffee: '☕' };

function ReactionButtons({ post }){
    const dispatch = useDispatch();
    const reactionButtons = Object.entries(reactionEmoji);
    const reactionButtonsMap = reactionButtons.map(function([name, emoji]){
        return (
            <button key={name} type="button" className="reactionButton" onClick={() => handleReaction(name) } >
                {emoji} {post.reactions[name]}
            </button>
        )
    });

    function handleReaction(name) {
        dispatch(postsActions.reactionAdded({ postId: post.id, reaction: name }))
    }

    return <div>{reactionButtonsMap}</div>
}
export default ReactionButtons;