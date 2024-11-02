import { useRef, useContext } from 'react';

import classes from './newsletter-registration.module.css';
import NotificationContext from '../../store/notification-context';

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const { showNotification } = useContext(NotificationContext);

  async function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    showNotification({ title: 'Signing up', message: 'Registering for newsletter', status: 'pending' });

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({ email: enteredEmail }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (response.ok) {
        return showNotification({ title: 'Success!', message: 'Successfully registered for newsletter', status: 'success' });
      } else {
        throw new Error(data.message || 'Something went wrong!');
      }
    } catch (error) {
      showNotification({ title: 'Error!', message: error.message || 'something went wrong', status: 'error' });
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input type='email' id='email' placeholder='Your email' aria-label='Your email' ref={emailInputRef} />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
