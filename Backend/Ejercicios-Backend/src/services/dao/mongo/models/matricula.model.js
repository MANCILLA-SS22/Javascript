import { Schema, model } from "mongoose";

const courseSchema = new Schema({
    title: String,
    description: String,
    professor: String,

    difficulty: {
        type: String, 
        enum: ["Beginner", "Intermediate", "Advanced"]
    },

    topics: {
        type: Array, 
        default: [],
    },

    students: [
        {
            type: Schema.Types.ObjectId, 
            ref: "persons", //This ref comes from --> const personModel = model("persons", personSchema);
            _id: false
        }
    ]
});

// courseSchema.pre("find", function () {
//   this.populate("students");
// });

const courseModel = model("matricula", courseSchema);
export { courseModel };
