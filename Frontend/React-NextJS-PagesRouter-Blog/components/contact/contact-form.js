import { useState, useEffect } from 'react';
import classes from './contact-form.module.css';
import Notification from '../ui/notification';

function ContactForm() {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredName, setEnteredName] = useState('');
    const [enteredMessage, setEnteredMessage] = useState('');
    const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
    const [requestError, setRequestError] = useState();

    //When we send a request, we get a feedback, either 'success' or 'error', but that feedback will never disappear. That's why we use useEffect so we can get rid of this issue. In this case, the state will re-render
    //after 3 seconds but with the 'requestStatus' and 'requestError' as null. That means that we don't have neither 'success' nor 'error' and there won't be any notification to show.
    useEffect(() => {
        if (requestStatus === 'success' || requestStatus === 'error') {
            const timer = setTimeout(() => {
                setRequestStatus(null);
                setRequestError(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [requestStatus]);

    let notification;
    console.log('notification', notification);

    if (requestStatus === 'pending') notification = { status: 'pending', title: 'Sending message...', message: 'Your message is on its way!' };
    if (requestStatus === 'success') notification = { status: 'success', title: 'Success!', message: 'Message sent successfully!' };
    if (requestStatus === 'error') notification = { status: 'error', title: 'Error!', message: requestError };

    async function sendMessageHandler(event) {
        event.preventDefault();
        setRequestStatus('pending');

        try {
            await sendContactData({ email: enteredEmail, name: enteredName, message: enteredMessage });
            setRequestStatus('success');
            setEnteredMessage('');
            setEnteredEmail('');
            setEnteredName('');
        } catch (error) {
            setRequestError(error.message);
            setRequestStatus('error');
        }
    }

    async function sendContactData(contactDetails) {
        const response = await fetch('/api/contact', {
            method: 'POST',
            body: JSON.stringify(contactDetails),
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Something went wrong!');
    }

    return (
        <section className={classes.contact}>
            <h1>How can I help you?</h1>
            <form className={classes.form} onSubmit={sendMessageHandler}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor='email'>Your Email</label>
                        <input type='email' id='email' required value={enteredEmail} onChange={(event) => setEnteredEmail(event.target.value)} />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='name'>Your Name</label>
                        <input type='text' id='name' required value={enteredName} onChange={(event) => setEnteredName(event.target.value)} />
                    </div>
                </div>
                <div className={classes.control}>
                    <label htmlFor='message'>Your Message</label>
                    <textarea id='message' rows='5' required value={enteredMessage} onChange={(event) => setEnteredMessage(event.target.value)} ></textarea>
                </div>

                <div className={classes.actions}>
                    <button>Send Message</button>
                </div>
            </form>
            {
                notification && (<Notification status={notification.status} title={notification.title} message={notification.message} />)
            }
        </section>
    );
}

export default ContactForm;