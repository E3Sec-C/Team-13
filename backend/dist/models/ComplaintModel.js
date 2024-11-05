"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ComplaintSchema = new mongoose_1.Schema({
    ID: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
exports.default = (0, mongoose_1.model)("complaints", ComplaintSchema);
