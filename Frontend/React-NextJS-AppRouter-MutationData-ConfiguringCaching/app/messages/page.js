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

// export const revalidate = 5;            //This is an alternative to use --> const response = await fetch('http://localhost:8080/messages', { next: { revalidate: 5 } });
// export const dynamic = 'force-dynamic'; //This is an alternative to use --> const response = await fetch('http://localhost:8080/messages', { cache: 'no-store' });

export default async function MessagesPage() {//On the server side, NextJS is actually overwriting the default built-in function that is provided by NodeJS and it essentially does that so that it can find out what cache settings you set up here because that will then change the behavior of the NextJS cache.
  // unstable_noStore(); //This is an alternative to use --> export const dynamic = 'force-dynamic';
  
  // const response = await fetch('http://localhost:8080/messages'); //Coment this out if we wanna use "revalidate" and "dynamic"
  // const response = await fetch('http://localhost:8080/messages', { cache: 'force-cache' });
  // const response = await fetch('http://localhost:8080/messages', { cache: 'no-store' });
  // const response = await fetch('http://localhost:8080/messages', { next: { revalidate: 5 } });
  // const response = await fetch('http://localhost:8080/messages', { next: { tags: ['msg'] }, });
  
  // const messages = await response.json();
  // const messages = getMessages();
  const messages = await getMessages();

  if (!messages || messages.length === 0) return <p>No messages found</p>;
  return <Messages messages={messages} />;
};