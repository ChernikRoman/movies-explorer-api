const bcrypt = require('bcrypt');

async function hashingPassword(password) {
  const promise = bcrypt.hash(password, 10)
    .then((hash) => hash);
  const hash = await promise;
  return hash;
}

module.exports = hashingPassword;
