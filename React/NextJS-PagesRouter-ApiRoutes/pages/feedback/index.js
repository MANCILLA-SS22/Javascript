import { Fragment, useState } from 'react';
import { buildFeedbackPath, extractFeedback } from '../api/feedback/index';

function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState();

  async function loadFeedbackHandler(id) {// /api/some-feedback-id
    const fetchingData = fetch(`/api/feedback/${id}`);
    const data = (await fetchingData).json();
    setFeedbackData(data.feedback);
  }

  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}{' '}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>Show Details</button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return { props: { feedbackItems: data } };
}

export default FeedbackPage;