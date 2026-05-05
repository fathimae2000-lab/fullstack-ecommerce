const reviewsQueries = require('../queries/reviews');
const pool = require('../config/db');

const createReview = (product_id, rating, comment, user_name) => {
    return new Promise((resolve, reject) => {
        pool.query(
            reviewsQueries.createReview, 
            [product_id, rating, comment, user_name], 
            (err, results) => {
                if (err) return reject(err);
                resolve({ success: true, data: results.rows[0] });
            }
        );
    });
};

const getReview = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(reviewsQueries.getReview, [id], (err, result) => {
            if (err) return reject(err);
            resolve({ success: true, data: result.rows });
        });
    });
};

const getAllReview = () => {
    return new Promise((resolve, reject) => {
        pool.query(reviewsQueries.getAllReview, (err, result) => {
            if (err) return reject(err);
            resolve({ success: true, data: result.rows });
        });
    });
};


module.exports = { createReview, getReview,getAllReview };