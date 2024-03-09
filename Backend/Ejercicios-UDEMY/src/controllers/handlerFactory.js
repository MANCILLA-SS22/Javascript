import { APIFeatures } from "../utils/apiFeatures.js";
import { AppError } from "../utils/appError.js";
import { catchFunc } from "../utils/catchAsync.js";

function deleteOne(Model){
    return catchFunc(async function(req, res, next){
        const doc = await Model.findByIdAndDelete(req.params.id);
        if(!doc) return next(new AppError("No document found with that ID", 404));
        res.status(204).json({ status: "success", data: null });
    });
};

function updateOne(Model){
    return catchFunc(async function(req, res, next){    
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if(!doc) return next(new AppError("No document found with that ID", 404));
        res.status(200).json({ data: doc });
    });
};

function createOne(Model){
    return catchFunc(async function(req, res, next){
        const doc = await Model.create(req.body);
        res.status(201).json({ status: "success", data: {tour: doc} });
    });
};

function getOne(Model, populationOption){
    return catchFunc(async function(req, res, next){
        let query = Model.findById(req.params.id);
        if(populationOption) query.populate(populationOption);
        const doc = await query;
    
        const modelName = Model.modelName.toLowerCase();
        console.log("modelName", modelName);
    
        res.status(200).json({
            status: "success",
            data: {
                [modelName] : doc
            }
        });
    });
}

function getAll(Model){
    return catchFunc(async function(req, res, next){ //http://localhost:5500/api/v1/tours
        let filter = {};
        if(req.params.tourId) filter = { tour: req.params.tourId }; //To allow for nested GET reviews on tour

        const features = new APIFeatures(Model.find(filter), req.query).filter().sort().limitFields().paginate(); //TourModel.find() stands for a mongoose query object. 
        const doc = await features.query; // We have use features.query because we need to get access to mongoose query in the constructor method. That's to say, the result of the mongoose methods such as sort, find, select and skip are stored in "this.query".
        // const doc = await features.query.explain();
        res.status(200).json({ status: "success", results: doc.length, data: {doc} });
    });
}

export {deleteOne, updateOne, createOne, getOne, getAll};

//{new: true, runValidators: true}
// new --> if true, return the modified document rather than the original
// runValidators --> if true, runs update validators on this command. Update validators validate the update operation against the model's schema