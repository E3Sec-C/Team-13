"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const HODSchema = new mongoose_1.Schema({
    ID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    funds: [mongoose_1.Schema.Types.ObjectId],
    complaints: [mongoose_1.Schema.Types.ObjectId],
    image: Buffer,
    education: String
});
exports.default = (0, mongoose_1.model)("hod", HODSchema);
