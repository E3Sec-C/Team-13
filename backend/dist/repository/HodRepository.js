"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HodModel_1 = __importDefault(require("../models/HodModel"));
const CrudRepository_1 = __importDefault(require("./CrudRepository"));
class HodRepository extends CrudRepository_1.default {
    constructor() {
        super(HodModel_1.default);
    }
}
exports.default = new HodRepository();
