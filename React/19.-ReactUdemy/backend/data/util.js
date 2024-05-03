import fs from 'node:fs/promises';

async function readData() {
  const data = await fs.readFile('events.json', 'utf8');
  return JSON.parse(data);
}

async function writeData(data) {
  await fs.writeFile('events.json', JSON.stringify(data, null, "\t"));
}

export {readData, writeData}