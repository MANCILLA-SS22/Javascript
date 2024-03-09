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

const courseSchema = new mongoose.Schema({
    title: objConfig_02,
    description: objConfig_01,
    teacherName: objConfig_02,
    students: {
        type: Array,
        default: []
    }
});

const coursesModel = mongoose.model('courses', courseSchema);

export {coursesModel};