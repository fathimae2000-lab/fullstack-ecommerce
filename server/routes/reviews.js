const express = require("express");
const router = express.Router();
const { createReview, getReview,getAllReview } = require('../controllers/reviews');
const{}=require('../utlis/passwordHelper')

router.get('/reviews/:id', getReview)
router.post('/reviews', createReview);
router.get('/reviews', getAllReview)



module.exports = router;