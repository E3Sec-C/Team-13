"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResearchPublicationsModel_1 = __importDefault(require("../models/ResearchPublicationsModel"));
const CrudRepository_1 = __importDefault(require("./CrudRepository"));
class ResearchPublicationsRepository extends CrudRepository_1.default {
    constructor() {
        super(ResearchPublicationsModel_1.default);
    }
}
exports.default = new ResearchPublicationsRepository();
