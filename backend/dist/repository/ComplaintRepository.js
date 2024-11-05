"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ComplaintModel_1 = __importDefault(require("../models/ComplaintModel"));
const CrudRepository_1 = __importDefault(require("./CrudRepository"));
class ComplaintRepository extends CrudRepository_1.default {
    constructor() {
        super(ComplaintModel_1.default);
    }
}
exports.default = new ComplaintRepository();
