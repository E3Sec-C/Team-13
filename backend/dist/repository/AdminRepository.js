"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AdminModel_1 = __importDefault(require("../models/AdminModel"));
const CrudRepository_1 = __importDefault(require("./CrudRepository"));
class AdminRepository extends CrudRepository_1.default {
    constructor() {
        super(AdminModel_1.default);
    }
}
exports.default = new AdminRepository();
