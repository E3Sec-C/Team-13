"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FundSchema = new mongoose_1.Schema({
    amount: {
        type: Number,
        required: true
    },
    organization: {
        type: String,
        required: true
    },
    issuedDate: {
        type: Date,
        required: true
    }
});
exports.default = (0, mongoose_1.model)("funds", FundSchema);
