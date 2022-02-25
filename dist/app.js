"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get('/:tokenId', (req, res, next) => {
    res.send(req.params);
});
app.listen('80', () => {
    console.log(`
  ################################################
  🛡️  Server listening on port: port 80 🛡️
  ################################################
`);
});
