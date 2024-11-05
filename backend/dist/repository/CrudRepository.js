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
class CrudRepository {
    constructor(model) {
        this.model = model;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.model.create(data);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteById(ID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.model.findOneAndDelete({ ID });
                return response;
            }
            catch (error) {
                throw new Error("Failed to delete document ${error.message}");
            }
        });
    }
    getById(ID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.model.findOne({ ID });
                return response;
            }
            catch (error) {
                throw new Error("Failed in getting the document with given id");
            }
        });
    }
    getByData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = this.model.findOne(data);
                return response;
            }
            catch (error) {
                throw new Error("Failed in getting the document with given data");
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.model.find({}).maxTimeMS(5000);
                return response;
            }
            catch (error) {
                throw new Error("Failed in getting all documents");
            }
        });
    }
    updateById(ID, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.model.findOneAndUpdate({ ID }, data, { new: true });
                return response;
            }
            catch (error) {
                throw new Error("Failed in updating the document with given id");
            }
        });
    }
}
exports.default = CrudRepository;
