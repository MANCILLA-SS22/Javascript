import {Schema, model} from "mongoose";

const bookingSchema = new Schema({
    price: {
        type: Number,
        require: [true, 'Booking must have a price.']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    paid: {
        type: Boolean,
        default: true
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
});

bookingSchema.pre(/^find/, function(next) {
    this.populate('user').populate({ path: 'tour', select: 'name' });
    next();
});


const BookingModel = model("Booking", bookingSchema);
export { BookingModel };