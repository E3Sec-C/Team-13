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
const index_1 = require("../services/index");
class Coursecontroller {
    createCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const courseData = req.body;
            try {
                const newCourse = yield index_1.CourseService.create(courseData);
                res.status(200).json(newCourse);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getCourseById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const course = yield index_1.CourseService.getById(req.params.ID);
                res.status(200).json(course);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateCourseById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const courseData = req.body;
            try {
                const updatedCourse = yield index_1.CourseService.updateById(req.params.ID, courseData);
                res.status(200).json(updatedCourse);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteCourseById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield index_1.CourseService.deleteById(req.params.ID);
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield index_1.CourseService.getAll();
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new Coursecontroller();
