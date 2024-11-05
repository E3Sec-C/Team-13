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
class CourseService {
    create(courseData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ID } = courseData;
            const result = yield index_1.CourseRepository.getByData({ ID: ID });
            if (result) {
                throw new CustomExceptions_1.ConflictError("Already existed Course with similar ID");
            }
            const response = yield index_1.CourseRepository.create(courseData);
            return response;
        });
    }
    getById(ID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield index_1.CourseRepository.getById(ID);
        });
    }
    updateById(ID, courseData) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield index_1.CourseRepository.updateById(ID, courseData);
            if (!response) {
                throw new CustomExceptions_1.NotFoundError("Course with given ID not found");
            }
            return response;
        });
    }
    deleteById(ID) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield index_1.CourseRepository.deleteById(ID);
            if (!response) {
                throw new CustomExceptions_1.NotFoundError("Course with given ID not found");
            }
            return response;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield index_1.CourseRepository.getAll();
        });
    }
}
exports.default = new CourseService();
