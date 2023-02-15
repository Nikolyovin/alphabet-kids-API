"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Letter = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    voice: { type: String, required: true },
    images: { type: String, required: true },
    words: { type: String, required: true },
});
exports.default = mongoose_1.default.model('Letter', Letter);
