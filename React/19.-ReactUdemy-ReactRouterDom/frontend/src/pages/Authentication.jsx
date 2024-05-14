import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

//This action will be triggered whenever the authForm is sumbitted
async function actionAuth({request}){ // {request} is part of the data package that we get as a parameter in this action function, that is executed by reat-router.
  const searchParams = new URL(request.url).searchParams; //We can't use the "useSearchParams" react-router hook because because hooks can be used only inside functional components.
  const mode = searchParams.get("mode") || "login";

  if(mode !== "login" && mode !== "signup") throw json({ message: "Unsupported mode."}, { status: 422});

  const data = await request.formData();
  const authData = { email: data.get("email"), password: data.get("password") }

const response = await fetch('http://localhost:8080/' + mode, {    
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },    
  body: JSON.stringify(authData),  
});

  console.log("response", response);

  if(response.status === 422 || response.status === 401) return response;
  if(!response.ok) throw json({ message: "Could not authenticare use."}, {status: 500});

  const resData = await  response.json();
  const token = resData.token;

  localStorage.setItem("token", token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());

  // return response;
  return redirect("/");
}

export {AuthenticationPage, actionAuth};

//In React, the useSearchParams hook is designed to be used specifically within functional components, leveraging the React Hooks API. 
//It allows you to access and manipulate the query parameters of the current URL. On the other hand, the URL object is a built-in browser API that provides methods for working with URLs. 
//It is not specific to React or React components. You can use it within any JavaScript function, including normal functions outside of React components.