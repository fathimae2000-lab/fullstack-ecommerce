const reviewsRepositories = require('../repositories/reviews');
const asyncHandler = require('express-async-handler');

const createReview = asyncHandler(async (req, res) => {
    const { product_id, rating, comment, user_name } = req.body;
    const newReview = await reviewsRepositories.createReview(product_id, rating, comment, user_name);
    res.status(201).json(newReview);
});

const getReview = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const review = await reviewsRepositories.getReview(id);
    res.status(200).json(review);
});

const getAllReview = asyncHandler(async (req, res) => {
    const review = await reviewsRepositories.getAllReview();
    res.status(200).json(review);
});

module.exports = { createReview, getReview,getAllReview };