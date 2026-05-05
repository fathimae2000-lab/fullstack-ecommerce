const createNewUser = `
INSERT INTO users (username, email, password, phone)
VALUES ($1, $2, $3, $4)
RETURNING *;
`;

const getUserByEmail = `
SELECT * FROM users WHERE email = $1;
`;

const getRolesByUserId = `
SELECT r.role
FROM roles r
JOIN users u ON u.role_id = r.id
WHERE u.id = $1;
`;

const getUserByUsername='select username from users where username=$1'

module.exports = {
  createNewUser,
  getUserByEmail,
  getRolesByUserId,
  getUserByUsername
};