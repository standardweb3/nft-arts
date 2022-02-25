"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataURI = void 0;
const ethers_1 = require("ethers");
const helper_1 = require("./helper");
const v1_abi_1 = require("./v1_abi");
const imageDataURI = __importStar(require("image-data-uri"));
const ethProvider = {
    4: "",
};
// get image datauri
async function getDataURI(chainId, tokenId) {
    const chain = helper_1.ChainId[chainId];
    const v1addr = await (0, helper_1.getAddress)("V1", chain);
    const api = await ethersApi(chainId);
    const v1 = new ethers_1.Contract(v1addr, v1_abi_1.V1ABI, api);
    // get svg string without defs
    const svg = await v1.SVG();
}
exports.getDataURI = getDataURI;
async function addDefs(svg) {
    svg.concat();
    var s = new XMLSerializer().serializeToString(document.getElementById("svg"));
    var encodedData = window.btoa(s);
    var imgSource = `data:image/svg+xml;base64,${encodedData}`;
}
async function ethersApi(chainId) {
    let provider = new ethers_1.ethers.providers.JsonRpcProvider(ethProvider[chainId]);
    let wallet = ethers_1.ethers.Wallet.fromMnemonic("test test test test test test test test test test test junk");
    let walletWithProvider = wallet.connect(provider);
    return walletWithProvider;
}
async function imgToDataURI(path) {
    imageDataURI.encodeFromFile(path);
}
