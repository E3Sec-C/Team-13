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
const UserModel_1 = __importDefault(require("../models/UserModel"));
const CrudRepository_1 = __importDefault(require("./CrudRepository"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserRepository extends CrudRepository_1.default {
    constructor() {
        super(UserModel_1.default);
    }
    login(userId, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch user from the database by userId
                const user = yield UserModel_1.default.findOne({ where: { userId } });
                if (!user) {
                    throw new Error('User not found');
                }
                // Check if the provided role matches the user's role
                if (user.role !== role) {
                    throw new Error('Incorrect role');
                }
                // Compare the provided password with the hashed password stored in the database
                const passwordMatch = yield bcryptjs_1.default.compare(password, user.password);
                if (!passwordMatch) {
                    throw new Error('Invalid password');
                }
                return user;
            }
            catch (error) {
                throw new Error("Failed to login");
            }
        });
    }
}
exports.default = new UserRepository();
