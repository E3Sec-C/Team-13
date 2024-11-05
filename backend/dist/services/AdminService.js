"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AdminRepository_1 = __importDefault(require("../repository/AdminRepository"));
const CustomExceptions_1 = require("../exceptions/CustomExceptions");
class AdminService {
    create(adminData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ID, email } = adminData;
            const result = yield AdminRepository_1.default.getByData({ ID: ID, email: email });
            if (result) {
                throw new CustomExceptions_1.ConflictError("Already existed user with similar data");
            }
            const response = yield AdminRepository_1.default.create(adminData);
            return response;
        });
    }
    getById(ID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AdminRepository_1.default.getById(ID);
        });
    }
    updateById(ID, adminData) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield AdminRepository_1.default.updateById(ID, adminData);
            if (!response) {
                throw new CustomExceptions_1.NotFoundError("Admin with given ID not found");
            }
            return response;
        });
    }
    deleteById(ID) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield AdminRepository_1.default.deleteById(ID);
            if (!response) {
                throw new CustomExceptions_1.NotFoundError("Admin with given ID not found");
            }
            return response;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AdminRepository_1.default.getAll();
        });
    }
}
exports.default = new AdminService();
