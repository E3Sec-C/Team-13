"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StudentModel_1 = __importDefault(require("../models/StudentModel"));
const CrudRepository_1 = __importDefault(require("./CrudRepository"));
class StudentRepository extends CrudRepository_1.default {
    constructor() {
        super(StudentModel_1.default);
    }
}
exports.default = new StudentRepository();
