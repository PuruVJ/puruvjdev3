const { promisify } = require('util');
const fs = require('fs');

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

async function main() {
  const data = await readFile('user-data.json');

  // Extract
  const { username, password } = JSON.parse(data);

  // Let's encrypt
  const encryptedPassword = encrypt(password);

  const finalObject = { username, password: encryptedPassword };

  // Let's write to another file
  await writeFile('user-data-final.json', JSON.stringify(finalObject));

  console.log('Successful');
}

try {
  main();
} catch (e) {
  console.error(e);
}
