'use client';

import { useFormState } from 'react-dom';
import FormSubmit from '@/components/form-submit';

export default function PostForm({ action }) {
  const [state, formAction] = useFormState(action, {});

  return <>
    <h1>Create a new post</h1>
    <form action={formAction}>
      <p className="form-control">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" />
      </p>
      <p className="form-control">
        <label htmlFor="image">Image</label>
        <input type="file" accept="image/png, image/jpeg" id="image" name="image" />
      </p>
      <p className="form-control">
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows="5" />
      </p>
      <p className="form-actions">
        <FormSubmit />
      </p>
      {
        state.errors && (
          <ul className="form-errors">
            {state.errors.map(error => <li key={error}>{error}</li>)}
          </ul>
        )
      }
    </form>
  </>
};

//(1)
//This hooks is responsible for managing the state of "NewPostPage" which uses a form that will be submitted with help of server-actions.
// --> The first argument is the actual server-action that should be triggered when the form is submitted.
// --> The second argument is the initial state of this component that should be returned by "useFormState" before the "createPost" has been triggered and yielded a repsonse.
// --> "formAction" is the second one should actually set as a value for the action prop on the form. 
// --> "state" is the current response of the component. So the latest response returned by this Server Action the initial state if no response has been received yet.
//      That state (createPost) depends on the execution of that Server Action and its response. And, we can the use this state, which will essentially be either "{}" or
//      any response we got back from createPost to output data in this component.

//(2)
//This kind of actions (action={formAction}) ARE SUPPORTED by NextJS and React here that will ensure that when this form is submitted, Next.js will, behind the scenes, create a request and send it to this Next.js 
//server that's serving the website so that the "SharedMealPage" function gets triggered, and you can then handle the form submission there, but on the server.