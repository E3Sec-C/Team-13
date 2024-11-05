"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CourseModelSchema = new mongoose_1.default.Schema({
    ID: { type: String },
    courseName: { type: String },
    startingDate: { type: Date },
    completionDate: { type: Date },
    registrations: { type: Number },
});
const CourseModel = mongoose_1.default.model("course", CourseModelSchema);
exports.default = CourseModel;
