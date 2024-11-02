import { useState } from 'react';
import { buildFeedbackPath, extractFeedback } from '../api/feedback/index';

function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState();

  async function loadFeedbackHandler(id) {
    try {
      const response = await fetch(`/api/feedback/${id}`);
      const data = await response.json();
      setFeedbackData(data.feedback);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  }

  return <>
    {feedbackData && <p>{feedbackData.email}</p>}
    <ul>
      {
        props.feedbackItems.map(function(item){
          return (
            <li key={item.id}>
              {item.text}{' '}
              <button onClick={loadFeedbackHandler.bind(null, item.id)}>Show Details</button>
            </li>
          )
        })
      }
    </ul>
  </>
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: { feedbackItems: data }
  };
}

export default FeedbackPage;