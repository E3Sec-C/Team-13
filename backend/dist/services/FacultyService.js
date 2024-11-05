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
const repository_1 = require("../repository");
const CustomExceptions_1 = require("../exceptions/CustomExceptions");
class FacultyService {
    create(facultyData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ID = '' } = facultyData;
            const result = yield repository_1.FacultyRepository.getById(ID);
            if (result) {
                throw new CustomExceptions_1.ConflictError("Already existed user with similar data");
            }
            const response = yield repository_1.FacultyRepository.create(facultyData);
            return response;
        });
    }
    getById(ID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield repository_1.FacultyRepository.getById(ID);
        });
    }
    updateById(ID, facultyData) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield repository_1.FacultyRepository.updateById(ID, facultyData);
            if (!response) {
                throw new CustomExceptions_1.NotFoundError("Faculty with given ID not found");
            }
            return response;
        });
    }
    deleteById(ID) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield repository_1.FacultyRepository.deleteById(ID);
            if (!response) {
                throw new CustomExceptions_1.NotFoundError("Faculty with given ID not found");
            }
            return response;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield repository_1.FacultyRepository.getAll();
        });
    }
}
exports.default = new FacultyService();
