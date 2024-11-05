"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ResearchPublicationsModelSchema = new mongoose_1.default.Schema({
    ID: { type: String },
    authorId: { type: String },
    authorName: { type: String },
    authorRole: { type: String },
    dateOfPublishing: { type: Date },
    description: { type: String },
    resource: { type: String },
});
exports.default = mongoose_1.default.model("researchPublications", ResearchPublicationsModelSchema);
