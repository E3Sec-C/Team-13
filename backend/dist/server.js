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
const express_1 = __importDefault(require("express"));
const ServerConfig_1 = require("./config/ServerConfig");
const DatabaseConfig_1 = require("./config/DatabaseConfig");
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/test', (req, res) => {
    res.status(201).json({ message: "Working fine" });
});
app.listen(ServerConfig_1.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server is running at http://localhost:${ServerConfig_1.PORT}`);
    (0, DatabaseConfig_1.connectDatabase)();
}));
app.use("/api", routes_1.default);
app.use((err, req, res, next) => {
    (0, errorHandler_1.default)(err, req, res, next);
});
