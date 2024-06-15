import { Form, Link, useSearchParams, useActionData, useNavigation } from 'react-router-dom';
import classes from './AuthForm.module.css';

function AuthForm() {
  const data = useActionData();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();

  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  // console.log("data", data);
  // console.log("navigation", navigation);
  // console.log("searchParams", searchParams.get("mode"));  

  function renderError(){
    if(data && data.errors){
      console.log("data", data);
      return (
        <ul>
          { Object.values(data.errors).map(err => <li key={err}>{err}</li>) }
        </ul>
      )
    }
  }

  function renderSuccess(){
    console.log("data", data);
    if(data && data.message) return <p>{data.message}</p>;
  }  

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        {renderError()}
        {renderSuccess()}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
