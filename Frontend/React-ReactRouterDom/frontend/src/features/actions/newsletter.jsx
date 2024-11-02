async function newsletterAction({ request }) {
  const data = await request.formData();
  const email = data.get('email'); console.log("email", email);
  return { message: 'Signup successful!' }; // send to backend newsletter server ...
};

export {newsletterAction};