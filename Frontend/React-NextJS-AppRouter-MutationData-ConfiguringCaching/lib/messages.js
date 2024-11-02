import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import sql from 'better-sqlite3';

const db = new sql('messages.db');

function initDb() {
  db.exec(`CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, text TEXT)`);
}

initDb();

export function addMessage(message) {
  db.prepare('INSERT INTO messages (text) VALUES (?)').run(message);
}

// export function getMessages(){
//     console.log('Fetching messages from db');
//     return db.prepare('SELECT * FROM messages').all();
// };

// export const getMessages = cache(function() {
//   console.log('Fetching messages from db');
//   return db.prepare('SELECT * FROM messages').all();
// });


export const getMessages = unstable_cache(cache(function() { //unstable_cache allows you to cache the results of expensive operations, like database queries, and reuse them across multiple requests. (it retusnrreturns a prmise).
    return db.prepare('SELECT * FROM messages').all();
  }),
  ['messages'],     // It works together with revalidate  ---> revalidatePath('/messages');
  { tags: ['msg'] } //It works together with revalidate   ---> revalidateTag("msg");
);
