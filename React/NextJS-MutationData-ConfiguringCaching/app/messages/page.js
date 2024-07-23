/* //Handling request memoization
import Messages from '@/components/messages';

export default async function MessagesPage() {
  const response = await fetch('http://localhost:8080/messages', { headers: { 'x-id': 'page' } });
  const messages = await response.json();
  if (!messages || messages.length === 0) return <p>No messages found</p>;
  return <Messages messages={messages} />;
}

//If we set up --> const response = await fetch('http://localhost:8080/messages'); in both layout.js and page.js then we'll get only one server request because of both request are equal. On the other hand
//If we set up: 
//  > const response = await fetch('http://localhost:8080/messages', {headers: { 'X-ID': 'layout'} });
//  > const response = await fetch('http://localhost:8080/messages', {headers: { 'X-ID': 'page'} });
//Then we'll got 2 console.logs because they're now diferent from each other. In this case, headers are the thing different. */

//Understanding The Data Cache & Cache Settings
import Messages from '@/components/messages';
import { getMessages } from '@/lib/messages';
// import { unstable_noStore } from 'next/cache';

//export const revalidate = 5;            //This is an alternative to use --> const response = await fetch('http://localhost:8080/messages', { next: { revalidate: 5 } });
//export const dynamic = 'force-dynamic'; //This is an alternative to use --> const response = await fetch('http://localhost:8080/messages', { cache: 'no-store' });

export default async function MessagesPage() {//On the server side, NextJS is actually overwriting the default built-in function that is provided by NodeJS and it essentially does that so that it can find out what cache settings you set up here because that will then change the behavior of the NextJS cache.
  //unstable_noStore(); //This is an alternative to use --> export const dynamic = 'force-dynamic';
  
  // const response = await fetch('http://localhost:8080/messages'); //Coment this out if we wanna use "revalidate" and "dynamic"
  // const response = await fetch('http://localhost:8080/messages', { cache: 'force-cache' }); //It is the default parameter, which in the end tells NextJS that the data should absolutely be cached and reused from that cache whenever possible.
  // const response = await fetch('http://localhost:8080/messages', { cache: 'no-store' }); //It will tell NextJS that in this fetch (only this, not other fetch requests with exactly the same name) the data should not be cached. Instead now with this setting, I'm forcing NextJS to always send a new request and use the response data of that request instead of caching and reusing the data.
  // const response = await fetch('http://localhost:8080/messages', { next: { revalidate: 5 } }); //We define a number, which will be the number of seconds NextJS should continue reusing the cache data until it will revalidate and throw away the cache. So if I set this to five, I'm telling NextJS that the cached data should be reused for five seconds, and then thereafter it should throw away the cached data and send a new request and get some new data and within that five second timeframe, if any requests to this page would be sent, it would instead not send extra requests to a backend, but reuse the cached data.
  // const response = await fetch('http://localhost:8080/messages', { next: { tags: ['msg'] }, }); //This tags will be connected to the cached data, and if you then call revalidateTag("msg") with a certain tag, NextJS will revalidate and throw away any cached data that has that tag. So that would allow you to clear the cache of multiple pages if those different pages would assign the same tags to their requests.
  
  // const messages = await response.json();
  const messages = getMessages();
  // const messages = await getMessages();

  if (!messages || messages.length === 0) return <p>No messages found</p>;
  return <Messages messages={messages} />;
};