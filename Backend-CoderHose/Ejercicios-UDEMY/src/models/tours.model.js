import { Schema, model } from "mongoose";
import slugify from "slugify"; //you can slugify a string by converting it to a URL-friendly format where any special characters and spaces are replaced with hyphens or underscores.

const tourSchema = new Schema({
    name: {
        type: String,
        required: [true, "A tour must have a name"],
        unique: true,
        trim: true,
        maxlength: [40, "A tour name must have less or equal than 40 characters"],
        minlength: [10, "A tour name must have more or equal than 10 characters"],
        // validator: [validator.isAlpha, "Tour name muist only contains characters"]
    },
    slug: String,
    duration: {
        type: Number,
        required: [true, "A tour must hava a duration"]
    },
    maxGroupSize: {
        type: Number,
        required: [true, "A tour must hava group size"]
    },
    difficulty: {
        type: String,
        required: [true, "A tour must hava diffcult"],
        enum: {
            values: ["easy", "medium", "difficulty"],
            messages: "Difficulty is either easy, mediom or difficult"
        }
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, "Rating must be above 1.0"],
        max: [5, "Rating must be above 5.0"],
        set: function(val){
            return Math.round(val * 10) / 10
        } //This function will be run each time that a new value is set for this field
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, "A tour must have a price"]
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function(val){
                return val < this.price; //this  only points to current doc on NEW document creation
            },
            message: "Discount price ({VALUE}) should be below regular price" // {VALUE} stands for the value coming from the function. In this case, "val",
        }
    },
    summary: {
        type: String,
        trim: true,
        required: [true, "A tour must have a description"]
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, "A tour must have a cover image"]
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false //This avoid we can limit fields. 
    },
    startDates: [Date],
    secretTour: {
        type: Boolean,
        default: false
    },

    startLocation: {
        //GeoJSON
        type: { type: String, default: "Point", enum: ["Point"] },
        coordinates: [Number],
        address: String,
        description: String,
    },
    locations: [
        {
            type: { type: String, default: "Point", enum: ["Point"] },
            coordinates: [Number],
            address: String,
            description: String,
            day: Number
        }
    ],
    guides:[
        {
            type: Schema.ObjectId, //We expect a type of each of the elements in the guides array to be a MongoDB id. 
            ref: "Users" //This "Users" comes from "const UserModel = model("Users", userSchema);" in userModel.js
        }
    ]
    // guides: Array//This is used for embeding
},{
    toJSON:{virtuals: true}, // To use the virtual properties, we need to explicitly define in our schema that we want the virtual properties in our output
    toObject:{virtuals: true}
});

//INDEX PROPERTIE: This will help the database engine to scan through the needed documents and not all of them.
tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: "2dsphere" }); //For geospatial data, this index needs to be a 2D sphere index id the data describes real points on the earth like spheres. Or insted we can also use a @D index if we're using fictional points on a simple two dimensional plane.

//VIRTUAL PROPERTIES: They are fields that we define on our schema but that will NOT be persisted (they'll not be saved into the database in order to save us some space there). virtual() --> Creates a virtual type with the given name
tourSchema.virtual("durationWeeks").get(function(){ //durationWeeks is the property we're gonna look for without saving it into the database. We need to use a regular function because we need to use the "this" keyword so we can point to the current document
    return this.duration / 7;
});

tourSchema.virtual("reviews", {
    ref: "Review",
    foreignField: "tour", //This is the name coming from the other model (reviewModel). 
    localField: "_id"
});

//DOCUMENT MIDDLEWARES: "pre" middlewares functions are gonna run before .save() and .create() command. "post" middlewares functions are executed after all the "pre" middleware functions have complited. "this" is gonna point to the currently processed document
tourSchema.pre("save", function(next){
    console.log(this);
    this.slug = slugify(this.name, {lower: true});
    next();
});

tourSchema.pre("save", function(next){
    console.log("Will save document..."); 
    next();
});

tourSchema.post("save", function(doc, next){
    console.log(doc);
    next();
});

//QUERY MIDDLEWARES: They allow us to run functions before or after a certain query is executed. Here, the "this" keyword will now point at the current query and NOT at the current document because we're not processing any document.
tourSchema.pre(/^find/, function(next){ // /^find/ means: everything that started with something. In this case, it's read as anything that started with "find", such as "find", "findOne", "findByIdAndUpdate", etc.
    this.populate({ //We use "this" because, in query middleware, "this" always points to the current query. So now, all of the queries will then automatically populate the guides field with the reference user.
        path: "guides",
        select: "-__v -passwordChangedAt" //Usamos un objeto para seleccionar la informacion que NO queremos mostrar. En este caso, "__v" y "passwordChangedAt"
    }); //We want to populate so to fill up the fields called guides in our model, since the "guides" field only contains the reference. So, with popullate, we're gonna fill it up with the actial data. (ONLY IN THE QUERY AND NOT IN THE ACTUAL DATABASE)

    next();
});

tourSchema.pre(/^find/, function(next){ 
    this.find({secretTour: {$ne: true}}); //When we use getAllTourse, before executing "const tours = await features.query;", we run this current middleware. it's important to note that our pre-find middleware is executed because it is "find", just like we used in TourModel.find()
    this.start = Date.now(); //We set a new object
    next();
});

tourSchema.post(/^find/, function(docs, next){
    console.log(`Querry took ${Date.now() - this.start} milliseconds!`);
    // console.log(docs);
    next();
});

// AGREGATION MIDDLEWARES: Here, "this" will point to the current aggregation object
tourSchema.pre("aggregate", function(next){
    this.pipeline().unshift({ 
        $match: {secretTour: {$ne: true }}
    });

    console.log(this.pipeline());
    next();
});

const TourModel = model("Tours", tourSchema);
export { TourModel };