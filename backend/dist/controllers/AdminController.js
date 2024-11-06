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
class AdminController {
    createAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const adminData = req.body;
            try {
                const newAdmin = yield index_1.AdminService.create(adminData);
                res.status(200).json(newAdmin);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAdminById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminReponse = yield index_1.AdminService.getById(req.params.ID);
                res.status(200).json(adminReponse);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateAdminById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const adminData = req.body;
            try {
                const adminReponse = yield index_1.AdminService.updateById(req.params.ID, adminData);
                res.status(200).json(adminReponse);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteAdminById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminReponse = yield index_1.AdminService.deleteById(req.params.ID);
                res.status(200).json(adminReponse);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield index_1.AdminService.getAll();
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new AdminController();
