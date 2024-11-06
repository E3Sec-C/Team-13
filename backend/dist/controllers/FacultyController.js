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
class FacultyController {
    createFaculty(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const facultyData = req.body;
            try {
                const newFaculty = yield index_1.FacultyService.create(facultyData);
                res.status(200).json(newFaculty);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getfacultyById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const faculty = yield index_1.FacultyService.getById(req.params.ID);
                res.status(200).json(faculty);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateFacultyById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const facultyData = req.body;
            try {
                const updatedFaculty = yield index_1.FacultyService.updateById(req.params.ID, facultyData);
                res.status(200).json(updatedFaculty);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deletefacultyById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield index_1.FacultyService.deleteById(req.params.ID);
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
                const response = yield index_1.FacultyService.getAll();
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new FacultyController();
