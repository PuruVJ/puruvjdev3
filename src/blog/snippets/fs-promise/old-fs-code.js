const fs = require('fs');

function main() {
  fs.readFile('user-data.json', (err, data) => {
    if (err) throw err;

    // Let's process the data
    const { username, password } = JSON.parse(data);

    // Let's encrypt
    const encryptedPassword = encrypt(password);

    const finalObject = { username, password: encryptedPassword };

    // Let's write it to another file
    fs.writeFile('user-data-final.json', JSON.stringify(finalObject), (err) => {
      if (err) throw err;

      console.log('Successful');
    });
  });
}

try {
  main();
} catch (e) {
  console.error(e);
}
