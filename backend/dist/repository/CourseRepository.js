"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CourseModel_1 = __importDefault(require("../models/CourseModel"));
const CrudRepository_1 = __importDefault(require("./CrudRepository"));
class CourseRepository extends CrudRepository_1.default {
    constructor() {
        super(CourseModel_1.default);
    }
}
exports.default = new CourseRepository();
