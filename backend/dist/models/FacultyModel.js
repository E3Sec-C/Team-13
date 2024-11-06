"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FacultySchema = new mongoose_1.Schema({
    ID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: String,
    assignedClasses: [String],
    image: Buffer,
    education: String
});
exports.default = (0, mongoose_1.model)("faculty", FacultySchema);
