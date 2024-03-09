import { ReviewModel } from "../models/reviewModel.js";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./handlerFactory.js";

/* const createReview = catchFunc(async function(req, res, next){
    
    //Metodo 1
    // if(!req.body.tour) req.body.tour = req.params.tourId;
    // if(!req.body.user) req.body.user = req.user.id; //We got this "req.user" from the "protect" middleware in authController.js
    // const reviews = await ReviewModel.create(req.body);

    //Metodo 2
    // const reviews = await ReviewModel.create({
    //     review: req.body.review,
    //     rating: req.body.rating,
    //     user: req.user.id,
    //     tour: req.params.tourId,
    // });

    //Metodo 3
    // req.body.tour ??= req.params.tourId;
    // const { id } = req.user;
    // const reviews = await ReviewModel.create({ ...req.body, id });

    //Metodo 4
    // const reviews = await ReviewModel.create({
    //     ...req.body,
    //     tour: req.params.tourId,
    //     user: req.user.id,
    // });

    res.status(200).json({
        status: "success",
        results: reviews.length,
        data: {reviews}
    });
}); */

function setTourUserIds(req, res, next){
    if(!req.body.tour) req.body.tour = req.params.tourId;
    req.body.user = req.user.id;
    // if(!req.body.user) req.body.user = req.user.id; //We got this "req.user" from the "protect" middleware in authController.js
    next();
};

const getAllReviews = getAll(ReviewModel)
const getReview = getOne(ReviewModel);
const createReview = createOne(ReviewModel);
const deleteReview = deleteOne(ReviewModel);
const updateReview = updateOne(ReviewModel);

export {getAllReviews, getReview, deleteReview, updateReview, setTourUserIds, createReview}