const fs = require('fs');

const readFile = (path) =>
  new Promise((resolve, reject) =>
    fs.readFile(path, (err, data) => {
      if (err) reject(err);

      resolve(data);
    })
  );

const writeFile = (path, data) =>
  new Promise((resolve, reject) =>
    fs.writeFile(path, data, (err) => {
      if (err) reject(err);

      resolve();
    })
  );

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
