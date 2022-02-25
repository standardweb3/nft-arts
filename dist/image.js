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
exports.imgToDataURI = exports.getDataURI = void 0;
const ethers_1 = require("ethers");
const helper_1 = require("./helper");
const v1_abi_1 = require("./v1_abi");
const nft_descriptor_abi_1 = require("./nft_descriptor_abi");
const imageDataURI = __importStar(require("image-data-uri"));
const fs_1 = require("fs");
const ethProvider = {
    4: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161 ",
};
const decode = (str) => Buffer.from(str, "base64").toString("binary");
const encode = (str) => Buffer.from(str, "binary").toString("base64");
// get image datauri
async function getDataURI(nft, chainId, tokenId) {
    const chain = helper_1.ChainId[chainId];
    const v1addr = await (0, helper_1.getAddress)(nft, chain);
    const nftdescaddr = await (0, helper_1.getAddress)("NFTDescriptor", chain);
    const api = await ethersApi(chainId);
    const v1 = new ethers_1.Contract(v1addr, v1_abi_1.V1ABI, api);
    const nftDesc = new ethers_1.Contract(nftdescaddr, nft_descriptor_abi_1.NFTDescABI, api);
    const svgPrev = await nftDesc.svgWithoutImages(tokenId);
    const metadataURI = await nftDesc.tokenURI(tokenId);
    // Decode metadata from descriptor
    const metadata = uriToJson(metadataURI);
    // Find images from it
    // background
    const bgData = await imgToDataURI(`./${nft}/backgrounds/${metadata.chainId}.png`);
    const bgSVG = await addBackgroundDefs(bgData);
    // network
    const netData = await imgToDataURI(`./${nft}/networks/${metadata.chainId}.png`);
    const netSVG = await addImage(netData, 285, 50, 60, 60);
    // collateral
    const cltData = await imgToDataURI(`./${nft}/tokens/${metadata.chainId}/${metadata.collateral}.png`);
    const cltSVG = await addImage(cltData, 269, 184, 40, 40);
    // debt
    const dbtData = await imgToDataURI(`./${nft}/tokens/${metadata.chainId}/${metadata.debt}.png`);
    const dbtSVG = await addImage(dbtData, 329, 184, 40, 40);
    // Add them together
    const bgNet = svgPrev.concat(bgSVG).concat(netSVG);
    const result = bgNet.concat(cltSVG).concat(dbtSVG).concat("</svg>");
    // Encode as svg uri and send response as server
    var base64 = require("base-64");
    var utf8 = require("utf8");
    const bytes = utf8.encode(result);
    const encoded = await svgToBase64(bytes);
    (0, fs_1.writeFileSync)("./test.txt", encoded);
    return encoded;
}
exports.getDataURI = getDataURI;
function uriToJson(uri) {
    const json = decode(uri.substring(29));
    const result = JSON.parse(json);
    return result;
}
async function svgToBase64(svg) {
    var encodedData = encode(svg);
    var imgSource = `data:image/svg+xml;base64,${encodedData}`;
    return imgSource;
}
async function addBackgroundDefs(data) {
    return `<defs>
  <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
      <use xlink:href="#image0" transform="scale(0.0025 0.004)" />
  </pattern>
  <image id="image0" width="400" height="250" xlink:href="${data}" />        
</defs>`;
}
async function ethersApi(chainId) {
    let provider = new ethers_1.ethers.providers.JsonRpcProvider(ethProvider[chainId]);
    let wallet = ethers_1.ethers.Wallet.fromMnemonic("test test test test test test test test test test test junk");
    let walletWithProvider = wallet.connect(provider);
    return walletWithProvider;
}
async function imgToDataURI(path) {
    return await imageDataURI.encodeFromFile(path);
}
exports.imgToDataURI = imgToDataURI;
async function addImage(data, x, y, width, height) {
    const imgTest = `<image x="${x}" y="${y}" width="${width}" height="${height}" xlink:href="${data}" />`;
    return imgTest;
}
