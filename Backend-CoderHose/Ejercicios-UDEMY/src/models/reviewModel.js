import {Schema, model} from "mongoose";
import { TourModel } from "./tours.model.js";

const reviewSchema = new Schema({
    review: {
        type: String,
        required: [true, "Review can not be empty!"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    creadedAt: {
        type: Date,
        default: Date.now
    },
    tour: {
        type: Schema.ObjectId,
        ref: "Tours",
        required: [true, "Review must belong to a tour!"]
    },
    user: {
        type: Schema.ObjectId,
        ref: "Users",
        required: [true, "User must belong to a user!"]
    }   
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

//STATICS: Database logic should be encapsulated within the data model. Mongoose provides 2 ways of doing this, methods and statics. Methods adds an instance method to documents whereas Statics adds static "class" methods to the Models itself.
reviewSchema.statics.calcAverageRatings = async function(tourId){ //statics are the methods defined on the Model. methods are defined on the document (instance). That's to say, methods can be used (instanced) in other files other than our model. In the case of statics, those functions are only used ONLY in the model and that exist ONLY in the model. (calcAverageRatings stands for a function in our model).
    console.log("tourId", tourId)
    const stats = await this.aggregate([ //We created the "calcAverageRatings" function as a static method, because we needed to call the aggregate function on the model. So, in a static method to the "this" keyword calls exactly to a method.
        {
            $match: {tour: tourId}
        },
        {
            $group: {
                _id: "$tour",
                nRating: { $sum: 1},
                avgRating: {$avg: "$rating"}
            }
        }
    ]);

    console.log("stats", stats);
    if(stats.length > 0){
        await TourModel.findByIdAndUpdate(tourId, {
            ratingsQuantity: stats[0].nRating,
            ratingsAverage: stats[0].avgRating
        });
    }else{
        await TourModel.findByIdAndUpdate(tourId, {
            ratingsQuantity: 0,
            ratingsAverage: 4.5
        });
    }
};

reviewSchema.post("save", function(){ //In this kind of middleware, the "this" keyword points to the document that is currently being saved
    //In Mongoose, a "document" generally means an instance of a model, or other word: model creates document. So when we call `this.constructor` in middleware `pre("save", fn)`, the `constructor` prop will return a reference to Model constructor that create the current document (in this case)
    console.log("this.constructor", this.constructor); // --> Model { Review }
    this.constructor.calcAverageRatings(this.tour); //this.constructor points to the model. The "this" keywrod stands for the current document and the "constructor" is basically the model who created that document. 
});

//SCHEMA INDEXES
reviewSchema.index({ tour: 1, user: 1 }, { unique: true }); //We prevent users from duplicating reviews.

//QUERY MIDDLEWARES: 
reviewSchema.pre(/^find/, function(next){

    //If we use this method, will create a chain of populates. We have the tour being populated with reviwes, but then the reviews also get populated with the tour again, and also with the use
    // this.populate({ //We use "this" because, in query middleware, "this" always points to the current query. So now, all of the queries will then automatically populate the guides field with the reference user.
    //     path: "tour", // tour and user stand for the name of the fields in the schema. 
    //     select: "name" 
    // }).populate({
    //     path: "user",
    //     select: "name photo"
    // });

    //Methos 2
    this.populate({
        path: "user",
        select: "name photo"
    });
    next();
});

reviewSchema.pre(/^findOneAnd/, async function(next){ //The "this" keyword in here stands for the current query.
    
    //"this.rev" variable is pointing to query object in pre middleware that is going to execute and it is an object so we can define any property on it like any other object so we did this.rev, this will create a new property on this(query object) and 
    // it is nothing to do with the schema because we are using query object.

    //In mongoose, when you use findOne() in a pre or post hook middleware, Mongoose automatically sets the query conditions based on the document being processed. You don't need to specify the ID explicitly because Mongoose uses the values from the current
    //document to create the query. "this" refers to the current query being executed. this.findOne() is used to fetch the current document based on the conditions of the current query. The conditions are automatically derived from the document being 
    //processed, and Mongoose uses the _id or any other unique identifier to locate the document.

    this.rev = await this.clone().findOne();//Mongoose no longer allows executing the same query object twice. If you do, you'll get a Query was already executed error. Executing the same query instance twice is typically indicative of mixing callbacks and promises, but if you need to execute the same query twice, you can call Query#clone() to clone the query and re-execute it.
    console.log("this.rev --> ", this.rev);
    next();
});

reviewSchema.post(/^findOneAnd/, async function(){
    console.log("this.rev.constructor  --> ", this.rev.constructor) // --> Model { Review }
    //In Mongoose, a "document" generally means an instance of a model, or other word: model creates document. So when we call `this.rev.constructor` in middleware `post("", fn)`, the `constructor` prop will return a reference to Model constructor that create the current document
    await this.rev.constructor.calcAverageRatings(this.rev.tour); 
});

// reviewSchema.post(/^findOneAnd/, async function(doc) {  //THIS QUERY MIDDLEWARE IS THE SAME AS THE TWO QUERY MIDDLEWARES ABOVE, BUT IN A SIMPLIFIED WAY.
//     console.log("doc --> ", doc);
//     if (doc) await doc.constructor.calcAverageRatings(doc.tour);
// });

const ReviewModel = model("Review", reviewSchema);
export { ReviewModel };

//At this point, we've populated the reviews with the tour and the user data right at the top. So, when we query for reviews, we get access to that information. But, that still leaves one problem unsolved,
//and it's related to how can we get access to reviews on the tours?. That's to say, query for a specific tour and then get access to all the reviews for that tour. This problem arises because we did 
//parent referencing on the reviews. Basically having the reviews pointingto the tours and not the tours pointing to the reviews. As we know, the parent doesn't know about its children (in this case, 
//the tour doesn't know about its reviews). To fix that we'll use child referencing on tours, which is basically keep an away of all the review ID's on each tour document. Then, all we'd have to do is to 
//populate that array. And the main method will be "virtual Populate" by MongoDB. With this, we can populate the tour with reviews, get access to all the reviews for a certain tour but without keeping
//this array of ID's on the tour. This is basically a way of keeping that array of reviews ID's on a tour but without persisting it to the database.