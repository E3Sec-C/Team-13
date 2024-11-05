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
class Complaintcontroller {
    createComplaint(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const complaintData = req.body;
            try {
                const newComplaint = yield index_1.ComplaintService.create(complaintData);
                res.status(200).json(newComplaint);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getComplaintById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const complaint = yield index_1.ComplaintService.getById(req.params.ID);
                res.status(200).json(complaint);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateComplaintById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const complaintData = req.body;
            try {
                const updatedComplaint = yield index_1.ComplaintService.updateById(req.params.ID, complaintData);
                res.status(200).json(updatedComplaint);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteComplaintById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield index_1.ComplaintService.deleteById(req.params.ID);
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
                const response = yield index_1.ComplaintService.getAll();
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new Complaintcontroller();
