"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const image_1 = require("./image");
const app = (0, express_1.default)();
app.get('/nft/:nft/:chainId/:tokenId', async (req, res, next) => {
    const resp = await (0, image_1.getDataURI)(req.params.nft, req.params.chainId, req.params.tokenId);
    res.send(resp);
});
app.listen('80', () => {
    console.log(`
  ################################################
  👩‍🎨  Picasso listening on port: port 80 👨‍🎨
  ################################################
`);
});
