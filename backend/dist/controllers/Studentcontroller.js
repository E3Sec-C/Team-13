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
class Studentcontroller {
    createStudent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentData = req.body;
            try {
                const newStudent = yield index_1.StudentService.create(studentData);
                res.status(200).json(newStudent);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getStudentById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const student = yield index_1.StudentService.getById(req.params.ID);
                res.status(200).json(student);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateStudentById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentData = req.body;
            try {
                const updatedStudent = yield index_1.StudentService.updateById(req.params.ID, studentData);
                res.status(200).json(updatedStudent);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteStudentById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield index_1.StudentService.deleteById(req.params.ID);
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
                const response = yield index_1.StudentService.getAll();
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new Studentcontroller();
