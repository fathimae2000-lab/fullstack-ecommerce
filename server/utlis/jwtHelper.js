const jwt = require('jsonwebtoken');

const secret = "jaisal12345";

// CREATE TOKEN
function createJwt(userId) {
  return jwt.sign({ userId }, secret, { expiresIn: '1h' });
}

// VERIFY TOKEN
function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded); 
      }
    });
  });
}

module.exports = {
  createJwt,
  verifyToken
};