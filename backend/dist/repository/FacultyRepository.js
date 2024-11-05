"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FacultyModel_1 = __importDefault(require("../models/FacultyModel"));
const CrudRepository_1 = __importDefault(require("./CrudRepository"));
class FacultyRepository extends CrudRepository_1.default {
    constructor() {
        super(FacultyModel_1.default);
    }
}
exports.default = new FacultyRepository();
