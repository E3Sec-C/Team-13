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
class ResearchPublicationscontroller {
    createResearchPublications(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const researchPublicationsData = req.body;
            try {
                const newResearchPublications = yield index_1.ResearchPublicationsService.create(researchPublicationsData);
                res.status(200).json(newResearchPublications);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getResearchPublicationsById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const researchPublications = yield index_1.ResearchPublicationsService.getById(req.params.ID);
                res.status(200).json(researchPublications);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateResearchPublicationsById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const researchPublicationsData = req.body;
            try {
                const updatedResearchPublications = yield index_1.ResearchPublicationsService.updateById(req.params.ID, researchPublicationsData);
                res.status(200).json(updatedResearchPublications);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteResearchPublicationsById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield index_1.ResearchPublicationsService.deleteById(req.params.ID);
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
                const response = yield index_1.ResearchPublicationsService.getAll();
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new ResearchPublicationscontroller();
