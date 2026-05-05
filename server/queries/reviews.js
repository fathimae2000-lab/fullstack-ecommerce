const createReview = 'INSERT INTO reviews (product_id, rating, comment, user_name) VALUES ($1, $2, $3, $4) RETURNING *;';
const getReview = 'SELECT * FROM reviews WHERE product_id = $1;';
const getAllReview = 'SELECT * FROM reviews';

module.exports = {
    createReview,
    getReview,
    getAllReview
};