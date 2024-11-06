"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NonTeachingStaffModel_1 = __importDefault(require("../models/NonTeachingStaffModel"));
const CrudRepository_1 = __importDefault(require("./CrudRepository"));
class NonTeachingStaffRepository extends CrudRepository_1.default {
    constructor() {
        super(NonTeachingStaffModel_1.default);
    }
}
exports.default = new NonTeachingStaffRepository();
