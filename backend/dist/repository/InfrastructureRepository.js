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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InfrastructureModel_1 = __importDefault(require("../models/InfrastructureModel"));
const CrudRepository_1 = __importDefault(require("./CrudRepository"));
class InfrastructureRepository extends CrudRepository_1.default {
    constructor() {
        super(InfrastructureModel_1.default);
    }
    getByAssetName(assetName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield InfrastructureModel_1.default.findOne({ assetName });
                return response;
            }
            catch (error) {
                throw new Error("Failed to get the Infrastructure name");
            }
        });
    }
    updateByAssetName(assetName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield InfrastructureModel_1.default.findOneAndUpdate({ assetName }, data, { new: true });
                return response;
            }
            catch (error) {
                throw new Error("Failed in updating the infrastructure with given Name");
            }
        });
    }
    deleteByAssetName(assetName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield InfrastructureModel_1.default.findOneAndDelete({ assetName });
                return response;
            }
            catch (error) {
                throw new Error("Failed to delete Infrastructure Details ${error.message}");
            }
        });
    }
}
exports.default = new InfrastructureRepository();
