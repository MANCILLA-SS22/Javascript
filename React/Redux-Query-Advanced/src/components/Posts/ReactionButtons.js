import { useAddReactionMutation } from "../../features/posts/postsSlice";

const reactionEmoji = { thumbsUp: '👍', wow: '😮', heart: '❤️', rocket: '🚀', coffee: '☕' };

function ReactionButtons({ post }){
    const [addReaction] = useAddReactionMutation();
    const reactionButtons = Object.entries(reactionEmoji);
    const reactionButtonsMap = reactionButtons.map(function([name, emoji]){
        return (
            <button key={name} type="button" className="reactionButton" onClick={function () { return handleReaction(name) }} >
                {emoji} {post.reactions[name]}
            </button>
        )
    });

    function handleReaction(name) {
        const newValue = post.reactions[name] + 1;
        addReaction({ postId: post.id, reactions: { ...post.reactions, [name]: newValue } })
    }

    return <div>{reactionButtonsMap}</div>
}
export default ReactionButtons;