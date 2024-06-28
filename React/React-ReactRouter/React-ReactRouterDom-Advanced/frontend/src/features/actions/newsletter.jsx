async function newsletterAction({ request }) {
  const data = await request.formData();
  const email = data.get('email');

  // send to backend newsletter server ...
  console.log("email", email);
  return { message: 'Signup successful!' };
};

export {newsletterAction};