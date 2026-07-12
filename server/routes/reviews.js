const express = require("express");
const router = express.Router();
const { createReview, getReview, getAllReview } = require('../controllers/reviews');

router.get('/:id', getReview)
router.post('/', createReview);
router.get('/', getAllReview)

module.exports = router;