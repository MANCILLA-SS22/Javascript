import mongoose from 'mongoose';

const objConfig_01 = {
    type: String,
    unique: true,
    required: true
};

const objConfig_02 = {
    type: String,
    required: true
};

const studentSchema = new mongoose.Schema({
    name: objConfig_02,
    lastName: objConfig_02,
    email: objConfig_01,
    age: objConfig_02,
    password: objConfig_02,
    fullName: {
        type: String
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
    },
    courses: {
        type: [
            {
                course: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "courses"
                }
            }
        ],
        default: []
    }

});

studentSchema.pre('findOne', function () {
    this.populate("courses.course");
});

const studentsModel = mongoose.model('students', studentSchema);

export {studentsModel};