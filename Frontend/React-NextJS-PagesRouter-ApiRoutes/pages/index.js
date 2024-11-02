import { useRef, useState } from 'react';

function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;
    const reqBody = { email: enteredEmail, text: enteredFeedback };

    async function feedback() {
      const obj = {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: { 'Content-Type': 'application/json' },
      }
      const fetchingData = await fetch('/api/feedback', obj);
      const data = fetchingData.json();
      console.log(data)
    }
    feedback();
  }

  async function loadFeedbackHandler() {
    const fetchingData = await fetch('/api/feedback');
    const data = fetchingData.json();
    setFeedbackItems(data.feedback);
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor='email'>Your Email Address</label>
          <input type='email' id='email' ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor='feedback'>Your Feedback</label>
          <textarea id='feedback' rows='5' ref={feedbackInputRef}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {
          feedbackItems.map(item => <li key={item.id}>{item.text}</li> )
        }
      </ul>
    </div>
  );
}

export default HomePage;
