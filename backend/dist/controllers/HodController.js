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
class HodController {
    createHod(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const hodData = req.body;
            try {
                const newHod = yield index_1.HodService.create(hodData);
                res.status(200).json(newHod);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getHodById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hod = yield index_1.HodService.getById(req.params.ID);
                res.status(200).json(hod);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateHodById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const hodData = req.body;
            try {
                const updatedHod = yield index_1.HodService.updateById(req.params.ID, hodData);
                res.status(200).json(updatedHod);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteHodById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield index_1.HodService.deleteById(req.params.ID);
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
                const response = yield index_1.HodService.getAll();
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new HodController();
