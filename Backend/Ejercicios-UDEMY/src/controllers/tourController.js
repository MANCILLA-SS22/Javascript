import multer from "multer";
import sharp from "sharp";
import {__dirname} from "../dirname.js";
import { TourModel } from "../models/tours.model.js";
import {catchFunc} from "../utils/catchAsync.js";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./handlerFactory.js";
import { AppError } from "../utils/appError.js";


const multerStorage = multer.memoryStorage(); //When doing image processing right after uploading a file, then it's always best not to even save the file to the disk, bu instead save it to memory. Now, by using memoryStorage(), the image will be stored as a buffer.

function multerFilter(req, file, cb){ //The goal of this function is to test if the uploaded file is an image. If it is so, then we pass true into teh callback function and if it's not then we pass false.
    file.mimetype.startsWith("image") ? cb(null, true) : cb(new AppError("Not an image! Please upload only images.", 404), false);
};

const upload = multer({  storage: multerStorage, fileFilter: multerFilter });
const uploadTourPhoto = upload.fields([
    {name: "imageCover", maxCount: 1},
    {name: "images", maxCount: 3}
]);

const resizeTourPhoto = catchFunc(async function(req, res, next){ // req.file and req.files are the name of your file in the form. (These second parameters come from Multer)
    if(!req.files.imageCover || !req.files.images) return next();
    req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`; //We put the image's file name on req.file.filename, which doesn't exist yet. We use imageCover because it is the name used in our SchemaTours
    await sharp(req.files.imageCover[0].buffer)
        .resize(2000, 1333)
        .toFormat("jpeg")
        .jpeg({quality: 90})
        .toFile(`${__dirname}/public/img/tours/${req.body.imageCover}`);

    req.body.images = [];
    await Promise.all( 
        req.files.images.map(async function(event, i){
            const filename = `tour-${req.params.id}-${Date.now()}-${i+1}.jpeg`;
            await sharp(event.buffer).resize(2000, 1333).toFormat("jpeg").jpeg({quality: 90}).toFile(`${__dirname}/public/img/tours/${filename}`);
            return req.body.images.push(filename);
        })
    );

    next();
});

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


//This is a middleware belonging to the /top-5-cheap route in tourUdemyroutes.js
async function aliasTopTours(req, res, next){ // http://localhost:5500/api/v1/tours/top-5-cheap
    //We prefill the quuery string for the user so that the user doesn't have to do it on his own.
    req.query.limit = "5";
    req.query.sort = "-ratingsAverage,price";
    req.query.fields = "name,price,ratingsAverage,summary,difficulty";
    next();
};

///These functions are part of the CRUD in mongodb.
const getAllTours = getAll(TourModel);
const getTour = getOne(TourModel, {path: "reviews"});
const postTour = createOne(TourModel);
const updateTour = updateOne(TourModel);
const deleteTour = deleteOne(TourModel);

//The follwing functions belong to aggregation
const getTourStats = catchFunc(async function(req, res, next){
    const stats = await TourModel.aggregate([ //Thjis will return an aggregate object
        {
            $match: { ratingsAverage: {$gte: 4.5} }
        },
        {
            $group: {
                _id: { $toUpper: "$difficulty" },
                numTours: { $sum: 1}, //This is a counter
                numRatings: { $sum: "$ratingsQuantity" },
                avgRating: { $avg: "$ratingsAverage" },
                avgPrice: { $avg: "$price" },
                minPrice: { $min: "$price" },
                maxPrice: { $max: "$price" },
            }
        },
        {
            $sort: { avgPrice: 1 }
        },
        // {
        //     $match: { _id: { $ne: "EASY" }} //This prove that we can use multiple "$match".
        // }
    ]);
    res.status(200).json({ data: stats });
});

const getMonthlyPlan = catchFunc(async function(req, res, next){ //http://localhost:5500/api/v1/tours/monthly-plan/2021
    const year = req.params.year * 1;
    const plan = await TourModel.aggregate([
        {
            $unwind: "$startDates" // --> Deconstructs an array field from the input documents to output a document for each element. Each output document is the input document with the value of the array field replaced by the element.
        },
        {
            $match: {
                startDates: { 
                    $gte: new Date(`${year}-01-01`), 
                    $lte: new Date(`${year}-12-31`)
                },
            }
        },
        {
            $group: {
                _id: { $month: "$startDates" },
                numTourStart: { $sum: 1 },
                tours: { $push: "$name" }
            }
        },
        {
            $addFields: { month: "$_id" }
        },
        {
            $project: { _id: 0 }
        },
        {
            $sort: { numTourStart: -1 }
        },
        {
            $limit: 12
        }
    ]);

    res.status(200).json({ data: plan });
});

const getToursWithin = catchFunc(async function(req, res, next){
    const {distance, latlng, unit} = req.params;
    const [lat, lng] = latlng.split(","); //When we get the latlng variable, we get something like 34.456534,-118.53464. So we have to separate both numbers into a new array. The ".split()" method is the right one.
    const radius  = unit === "mi" ? distance / 3963.2 : distance / 6378.1;

    if (!lat || !lng) return new AppError("Please provide latitude and longitude in the format lat,lng !!", 400);

    const tours = await TourModel.find( //We want to query for start location becauset the start location field is what holds the geospatial point where each tour starts.
        {
            startLocation: {$geoWithin: {$centerSphere: [ [lng, lat], radius ]  }}
        }
    ); 

    res.status(200).json({
        status: "success",
        results: tours.length,
        data: {tours}
    });

});

const getDistances = catchFunc(async function(req, res, next){
    const {latlng, unit} = req.params;
    const [lat, lng] = latlng.split(","); //When we get the latlng variable, we get something like 34.456534,-118.53464. So we have to separate both numbers into a new array. The ".split()" method is the right one.
    const multiplier = unit === "mi"? 0.000621371 : 0.001;

    if (!lat || !lng) return new AppError("Please provide latitude and longitude in the format lat,lng !!", 400);

    const distances = await TourModel.aggregate([
        {
            $geoNear: {
                near: {
                    type: "Point",
                    coordinates: [lng*1, lat*1]
                },
                distanceField: "distance",
                distanceMultiplier: multiplier
            },
        },
        {
            $project: {
                distance: 1,
                name: 1
            }
        }
    ]);

    res.status(200).json({
        status: "success",
        data: {distances}
    });

});

export {getAllTours, getTour, postTour, updateTour, deleteTour, aliasTopTours, getTourStats, getMonthlyPlan, getToursWithin, getDistances, uploadTourPhoto, resizeTourPhoto}

/* //Using handleFactory and error handler
import {__dirname} from "../utils.js";
import { TourModel } from "../models/tours.model.js";
import { APIFeatures } from "../utils/apiFeatures.js";
import {AppError} from "../utils/appError.js";
import {catchFunc} from "../utils/catchAsync.js";
import { deleteOne } from "./handlerFactory.js";

//This is a middleware belonging to the /top-5-cheap route in tourUdemyroutes.js
async function aliasTopTours(req, res, next){ // http://localhost:5500/api/v1/tours/top-5-cheap
    //We prefill the quuery string for the user so that the user doesn't have to do it on his own.
    req.query.limit = "5";
    req.query.sort = "-ratingsAverage,price";
    req.query.fields = "name,price,ratingsAverage,summary,difficulty";
    next();
};

///These functions are part of the CRUD in mongodb.
const getAllTours = catchFunc(async function(req, res, next){ //http://localhost:5500/api/v1/tours
    const features = new APIFeatures(TourModel.find(), req.query).filter().sort().limitFields().paginate(); //TourModel.find() stands for a mongoose query object. 
    const tours = await features.query; // We have use features.query because we need to get access to mongoose query in the constructor method. That's to say, the result of the mongoose methods such as sort, find, select and skip are stored in "this.query".
    res.status(200).json({ status: "success", results: tours.length, data: {tours} });
});

const getTour = catchFunc(async function(req, res, next){
    const tour = await TourModel.findById(req.params.id).populate("reviews");
    //(1) There are some id's that are valid and not exist. For example: "65a3c8eb57c6431e857c1931m", where the last 2 digits are modified. So, it's a valid id but it doesn't exist in the database.
    //(2) On the other hand, there are id's that doesn't exist and are not valid. For example, "btgrtred" or "65a3c8eb57c6431e857c1931mwscvefer", where the second one have even more digits than it should.
    // if the "tour" is equal to the (1) option, then the "if" statment will be executed. Otherwise, it won't be executed but the "globalErrorHandler" does.
    if (!tour) return next(new AppError('No tour found with that ID', 404));

    res.status(200).json({ status: "success",  data: {tour} });
});

const postTour = catchFunc(async function(req, res, next){
    const newTour = await TourModel.create(req.body);
    res.status(201).json({ status: "success", data: {tour: newTour} });
});

const updateTour = catchFunc(async function(req, res, next){    
    // new --> if true, return the modified document rather than the original
    // runValidators --> if true, runs update validators on this command. Update validators validate the update operation against the model's schema
    const tour = await TourModel.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

    if(!tour) return next(new AppError("No tour found with that ID", 404));

    res.status(200).json({ data: tour });
});

const deleteTour = catchFunc(async function(req, res, next){
    const tour = await TourModel.findByIdAndDelete(req.params.id);

    if(!tour) return next(new AppError("No tour found with that ID", 404));

    res.status(204).json({ status: "success", data: null });
});

//The follwing functions belong to aggregation
const getTourStats = catchFunc(async function(req, res, next){
    const stats = await TourModel.aggregate([ //Thjis will return an aggregate object
        {
            $match: { ratingsAverage: {$gte: 4.5} }
        },
        {
            $group: {
                _id: { $toUpper: "$difficulty" },
                numTours: { $sum: 1}, //This is a counter
                numRatings: { $sum: "$ratingsQuantity" },
                avgRating: { $avg: "$ratingsAverage" },
                avgPrice: { $avg: "$price" },
                minPrice: { $min: "$price" },
                maxPrice: { $max: "$price" },
            }
        },
        {
            $sort: { avgPrice: 1 }
        },
        // {
        //     $match: { _id: { $ne: "EASY" }} //This prove that we can use multiple "$match".
        // }
    ]);
    res.status(200).json({ data: stats });
});

const getMonthlyPlan = catchFunc(async function(req, res, next){ //http://localhost:5500/api/v1/tours/monthly-plan/2021
    const year = req.params.year * 1;
    const plan = await TourModel.aggregate([
        {
            $unwind: "$startDates" // --> Deconstructs an array field from the input documents to output a document for each element. Each output document is the input document with the value of the array field replaced by the element.
        },
        {
            $match: {
                startDates: { 
                    $gte: new Date(`${year}-01-01`), 
                    $lte: new Date(`${year}-12-31`)
                },
            }
        },
        {
            $group: {
                _id: { $month: "$startDates" },
                numTourStart: { $sum: 1 },
                tours: { $push: "$name" }
            }
        },
        {
            $addFields: { month: "$_id" }
        },
        {
            $project: { _id: 0 }
        },
        {
            $sort: { numTourStart: -1 }
        },
        {
            $limit: 12
        }
    ]);

    res.status(200).json({ data: plan });
});

export {getAllTours, getTour, postTour, updateTour, deleteTour, aliasTopTours, getTourStats, getMonthlyPlan} */

/* Without using error handler
import {__dirname} from "../utils.js";
import { TourModel } from "../models/tours.model.js";
import { APIFeatures } from "../utils/apiFeatures.js";

//This is a middleware belonging to the /top-5-cheap route in tourUdemyroutes.js
async function aliasTopTours(req, res, next){ // http://localhost:5500/api/v1/tours/top-5-cheap
    //We prefill the quuery string for the user so that the user doesn't have to do it on his own.
    req.query.limit = "5";
    req.query.sort = "-ratingsAverage,price";
    req.query.fields = "name,price,ratingsAverage,summary,difficulty";
    next();
}

///These functions are part of the CRUD in mongodb.
async function getAllTours(req, res){  //http://localhost:5500/api/v1/tours
    try { 
        const features = new APIFeatures(TourModel.find(), req.query).filter().sort().limitFields().paginate(); //TourModel.find() stands for a mongoose query object. 
        const tours = await features.query; // We have use features.query because we need to get access to mongoose query in the constructor method. That's to say, the result of the mongoose methods such as sort, find, select and skip are stored in "this.query".
        res.status(200).json({ status: "success", results: tours.length, data: {tours} });

    } catch (error) {
        res.status(404).json({status: "fail", message: error});
    }
};

async function getTour(req, res){
    try {
        const tour = await TourModel.findById(req.params.id)
        res.status(200).json({ status: "success",  data: {tour} });
    } catch (error) {
        res.status(404).json({status: "fail", message: error});
    }
};

async function postTour(req, res){
    try {
        const newTour = await TourModel.create(req.body);
        res.status(201).json({ status: "success", data: {tour: newTour} });
    } catch (error) {
        res.status(400).json({status: "fail", message: error})
    }
};

async function updateTour(req, res){    
    try {
        // new --> if true, return the modified document rather than the original
        // runValidators --> if true, runs update validators on this command. Update validators validate the update operation against the model's schema
        const tour = await TourModel.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        res.status(200).json({ data: tour });
    } catch (error) {
        res.status(404).json({status: "fail", message: error});
    }
};

async function deleteTour(req, res){
    try {
        const tour = await TourModel.findByIdAndDelete(req.params.id);
        res.status(204).json({ status: "success", data: null });
    } catch (error) {
        res.status(404).json({status: "fail", message: error});
    }
};

//The follwing functions belong to aggregation
async function getTourStats(req, res){
    try {
        const stats = await TourModel.aggregate([ //Thjis will return an aggregate object
            {
                $match: { ratingsAverage: {$gte: 4.5} }
            },
            {
                $group: {
                    _id: { $toUpper: "$difficulty" },
                    numTours: { $sum: 1}, //This is a counter
                    numRatings: { $sum: "$ratingsQuantity" },
                    avgRating: { $avg: "$ratingsAverage" },
                    avgPrice: { $avg: "$price" },
                    minPrice: { $min: "$price" },
                    maxPrice: { $max: "$price" },
                }
            },
            {
                $sort: { avgPrice: 1 }
            },
            // {
            //     $match: { _id: { $ne: "EASY" }} //This prove that we can use multiple "$match".
            // }
        ]);
        res.status(200).json({ data: stats });
    } catch (error) {
        res.status(404).json({status: "fail", message: error});
    }
};

async function getMonthlyPlan(req, res){ //http://localhost:5500/api/v1/tours/monthly-plan/2021
    try {
        const year = req.params.year * 1;
        const plan = await TourModel.aggregate([
            {
                $unwind: "$startDates" // --> Deconstructs an array field from the input documents to output a document for each element. Each output document is the input document with the value of the array field replaced by the element.
            },
            {
                $match: {
                    startDates: { 
                        $gte: new Date(`${year}-01-01`), 
                        $lte: new Date(`${year}-12-31`)
                    },
                }
            },
            {
                $group: {
                    _id: { $month: "$startDates" },
                    numTourStart: { $sum: 1 },
                    tours: { $push: "$name" }
                }
            },
            {
                $addFields: { month: "$_id" }
            },
            {
                $project: { _id: 0 }
            },
            {
                $sort: { numTourStart: -1 }
            },
            {
                $limit: 12
            }
        ]);

        res.status(200).json({ data: plan });
    } catch (error) {
        res.status(404).json({status: "fail", message: "Mission failed!"});
    }
}

export {getAllTours, getTour, postTour, updateTour, deleteTour, aliasTopTours, getTourStats, getMonthlyPlan} */

/* //Normal method
import {__dirname} from "../utils.js";
import { TourModel } from "../models/tours.model.js";

async function aliasTopTours(req, res, next){ // http://localhost:5500/api/v1/tours/top-5-cheap
    //We prefill the quuery string for the user so that the user doesn't have to do it on his own.
    req.query.limit = "5";
    req.query.sort = "-ratingsAverage,price";
    req.query.fields = "name,price,ratingsAverage,summary,difficulty";
    next();
}

async function getAllTours(req, res){ 
    try {
        const {page, sort, limit, fields, ...queryObj } = req.query; //We create a new object with the provided queries in the following link --> http://localhost:5500/api/v1/tours?duration=5&difficulty=easy&page=2&sort=1&limit=10.
        let query;
        
        // %%%%%%%%%%%%%%%%%%%%%%%   Filtering (.find)   %%%%%%%%%%%%%%%%%%%%%%%
        // query = TourModel.find(queryObj); //The result is { duration: '5', difficulty: 'easy' } because we can't duplicate the same keys in the object. So the first 4 elements are repited.

        // %%%%%%%%%%%%%%%%%%%%%%%   advanced filtering($gte, $gt, $lte, $lt)   %%%%%%%%%%%%%%%%%%%%%%%
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, event => `$${event}`); //http://localhost:5500/api/v1/tours?duration[gte]=5&difficulty=easy&price[lt]=1500
        // console.log("1.- ", JSON.parse(queryStr));
        query = TourModel.find(JSON.parse(queryStr)); //This return a query 

        // %%%%%%%%%%%%%%%%%%%%%%%   Sorting (.sort)   %%%%%%%%%%%%%%%%%%%%%%%
        if(req.query.sort){ //http://localhost:5500/api/v1/tours?sort=price,ratingsAverage    (If we want to sort the elements according to a second parameter, we just need to as a coma ",")
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy); 
        }else{
            query = query.sort("-createdAt _id"); //According to documentation at Mongo when using $skip with $sort it is advised to include _id or another unique identifier as any duplicates can cause errors (as we have seen).
        }

        // %%%%%%%%%%%%%%%%%%%%%%%   limiting fields (.select)   %%%%%%%%%%%%%%%%%%%%%%%
        if (req.query.fields) { //http://localhost:5500/api/v1/tours?fields=name,duration,difficulty,price
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields);  //("name duration, price")
        } else {
            query = query.select("-__v"); //The minus "-" sign is useful to EXCLUDE. That's to say, we'll include everything except the __v field
        }

        // %%%%%%%%%%%%%%%%%%%%%%%   pagination   %%%%%%%%%%%%%%%%%%%%%%%
        const initPage = req.query.page*1 || 1;
        const initLimit = req.query.limit*1 || 100;
        const skip = (initPage - 1) * initLimit;   //http://localhost:5500/api/v1/tours?page=3&limit=10  --> 1-10 page 1, 11-20 page 2, 21-30 page 3
        query = query.skip(skip).limit(initLimit); //limit() is exactly the same as the limit we defined in the query string (the amount of results that we want in the query). skip(), is the amount of results that should be skipped before querying data. 
        if (req.query.page) {
            const numTours = await TourModel.countDocuments();
            if (skip >= numTours) throw new Error("This page does not exists!");
        }

        // We have this so we can implement sorting or pagination. Otherwise, We'll failure to apply those methods. Tour.find(queryObj) returns an object of type query. So, if we write await in front of it then that query will be executed immediately and the matching  document will be returned. But if we want to implement function chaining and call other methods as well on the returned query object, like sort or pagination,  then we should not write await in front of it. First store the returned query object in a variable and then use it later for executing the query.
        const tours = await query; //So far, this line of code is the same as having: query.sort().select().skip().limit(). Each of these methods will return a new query that we can then chain on the next method, adn the next methodd until we finally await the query.
        res.status(200).json({ status: "success", results: tours.length, data: {tours} });

        // const tours = await TourModel.find({duration: 5, difficulty: "easy"}); //Method 2: Finding elements hard-coding queries in the "find" mongoose method
        // const tours = await TourModel.find().where("duration").equals(5).where("difficulty").equals("easy"); //Method 3: Finding elements hard-coding queries in the "find" mongoose method 
        
        // //http://localhost:5500/api/v1/tours?duration=5&difficulty=easy&page=2&sort=1&limit=10
        // const queryObj = {...req.query}; //We create a new object with the provided queries in the link up there.
        // const exlucdeFields = ["page", "sort", "limit", "fields"]; //We create a new array of strings which will allow us to delete the non-ncessesary queries. (In this case, "page", "sort", "limit" are provided in the link but they are not found in the databasis)
        // exlucdeFields.forEach(event => delete queryObj[event]); //By using a forEach method, we delete all the elements which match with the exlucdeFields array.

    } catch (error) {
        res.status(404).json({status: "fail", message: error});
    }
}

async function getTour(req, res){
    try {
        const tour = await TourModel.findById(req.params.id)
        res.status(200).json({ status: "success",  data: {tour} });
    } catch (error) {
        res.status(404).json({status: "fail", message: error});
    }
}

async function postTour(req, res){
    try {
        const newTour = await TourModel.create(req.body);
        res.status(201).json({ status: "success", data: {tour: newTour} });
    } catch (error) {
        res.status(400).json({status: "fail", message: error})
    }
}

async function updateTour(req, res){    
    try {
        // new --> if true, return the modified document rather than the original
        // runValidators --> if true, runs update validators on this command. Update validators validate the update operation against the model's schema
        const tour = await TourModel.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        res.status(200).json({ data: tour });
    } catch (error) {
        res.status(404).json({status: "fail", message: error});
    }
};

async function deleteTour(req, res){
    try {
        const tour = await TourModel.findByIdAndDelete(req.params.id);
        res.status(204).json({ status: "success", data: null });
    } catch (error) {
        res.status(404).json({status: "fail", message: error});
    }
};

export {getAllTours, getTour, postTour, updateTour, deleteTour, aliasTopTours} */

/* // Using file system
import fs from "fs";
import {__dirname} from "../utils.js";
import { TourModel } from "../models/tours.model.js";
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

function checkId(req, res, next, val){ //middleware
    const {id} = req.params;
    console.log(`Tour id is: ${val}`);
    if(+id > tours.length){
        return res.status(404).json({
            status: "fail", 
            message: "Invalid ID"
        });
    };
    next();
};

function checkBody(req, res, next){ //middleware
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({status: "fail", message: "Missing name or price"});
    }
    next();
}

function getAllTours(req, res){
    res.status(200).json({
        status: "success",
        requestedAt: req.requstTime, 
        results: tours.length,
        data: {tours}
    });
}

function getTour(req, res){
    const {id} = req.params;
    const tour = tours.find(event => event.id === +id);
    res.status(200).json({
        status: "success", 
        data: {tour}
    });
}

function postTour(req, res){
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours, null, "\t"), function(err){
        res.status(201).json({
            status: "success",
            data: {tour: newTour}
        });
    });
}

function updateTour(req, res){    
    res.status(200).json({
        data: "<Updated tour here..>"
    });
};

function deleteTour(req, res){
    res.status(204).json({
        status: "success", 
        data: null
    });
};

export {getAllTours, getTour, postTour, updateTour, deleteTour, checkId, checkBody} */