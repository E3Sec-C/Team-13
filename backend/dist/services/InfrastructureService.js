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
class InfrastructureService {
    create(infrastructureData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { assetName } = infrastructureData;
            const result = yield index_1.InfrastructureRepository.getByData({ assetName: assetName });
            if (result) {
                throw new CustomExceptions_1.ConflictError("Already existed Infrastructure with similar name");
            }
            const response = yield index_1.InfrastructureRepository.create(infrastructureData);
            return response;
        });
    }
    getByAssetName(assetName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield index_1.InfrastructureRepository.getByAssetName(assetName);
        });
    }
    updateByAssetName(assetName, infrastructureData) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield index_1.InfrastructureRepository.updateById(assetName, infrastructureData);
            if (!response) {
                throw new CustomExceptions_1.NotFoundError("Infrastructure with given assetName not found");
            }
            return response;
        });
    }
    deleteByAssetName(assetName) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield index_1.InfrastructureRepository.deleteById(assetName);
            if (!response) {
                throw new CustomExceptions_1.NotFoundError("Infrastructure with given assetName not found");
            }
            return response;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield index_1.InfrastructureRepository.getAll();
        });
    }
}
exports.default = new InfrastructureService();
