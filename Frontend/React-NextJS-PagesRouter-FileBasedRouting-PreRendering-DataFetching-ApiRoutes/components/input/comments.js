import { useEffect, useState } from 'react';
import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments({ eventId }) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);
  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      async function fetchingData(){
        try {
          const response = await fetch('/api/comments/' + eventId);
          const data = await response.json();
          setComments(data.comments);
          setIsFetchingComments(false);
        } catch (error) {
          console.log(error);
        }
      }

      fetchingData();
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    try {
      showNotification({ title: 'Sending comment...', message: 'Your comment is currently being stored into a database', status: 'pending' });
      
      const response = await fetch('/api/comments/' + eventId, {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (response.ok) {
        return showNotification({ title: 'Success!', message: 'Your comment was saved!', status: 'success' });
      } else {
        throw new Error(data.message || 'Something went wrong!');
      }

    } catch (error) {
      showNotification({ title: 'Error!', message: error.message || 'something went wrong', status: 'error' });
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
      {showComments && isFetchingComments && <p>Loading...</p> }
    </section>
  );
}

export default Comments;