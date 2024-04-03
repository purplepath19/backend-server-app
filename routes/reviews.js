var express = require('express');
var router = express.Router();

const isAuthenticated = require('../middleware/isAuthenticated')

const Review = require('../models/Review')
const School = require('../models/SchoolModel')

router.post('/:schoolId', isAuthenticated, (req, res, next) => {

    let review = req.body

    Review.create({
        ...review,
        author: req.user._id
    })
        .then((newReview) => {
            School.findByIdAndUpdate(
                req.params.schoolId,
                {$push: {reviews: newReview._id}},
                {new: true}
                )
                .then((updatedSchool) => {
                    res.json({newReview, updatedSchool})
                })
                .catch((err) => {
                    console.log(err)
                    res.json(err)
                })
        })
        .catch((err) => {
            console.log(err)
            res.json(err)
        })


})


module.exports = router;