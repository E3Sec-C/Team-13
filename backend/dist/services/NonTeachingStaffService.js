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
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../repository/index");
const CustomExceptions_1 = require("../exceptions/CustomExceptions");
class NonTeachingStaffService {
    create(nonTeachingStaffData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ID } = nonTeachingStaffData;
            const result = yield index_1.NonTeachingStaffRepository.getByData({ ID: ID });
            if (result) {
                throw new CustomExceptions_1.ConflictError("Already existed user with similar data");
            }
            const response = yield index_1.NonTeachingStaffRepository.create(nonTeachingStaffData);
            return response;
        });
    }
    getById(ID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield index_1.NonTeachingStaffRepository.getById(ID);
        });
    }
    updateById(ID, nonTeachingStaffData) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield index_1.NonTeachingStaffRepository.updateById(ID, nonTeachingStaffData);
            if (!response) {
                throw new CustomExceptions_1.NotFoundError("NonTeachingStaff with given ID not found");
            }
            return response;
        });
    }
    deleteById(ID) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield index_1.NonTeachingStaffRepository.deleteById(ID);
            if (!response) {
                throw new CustomExceptions_1.NotFoundError("NonTeachingStaff with given ID not found");
            }
            return response;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield index_1.NonTeachingStaffRepository.getAll();
        });
    }
}
exports.default = new NonTeachingStaffService();
