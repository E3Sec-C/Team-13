"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FundsModel_1 = __importDefault(require("../models/FundsModel"));
const CrudRepository_1 = __importDefault(require("./CrudRepository"));
class FundsRepository extends CrudRepository_1.default {
    constructor() {
        super(FundsModel_1.default);
    }
}
exports.default = new FundsRepository();
