import { Contract, ethers } from "ethers";
import { ChainId, getAddress } from "./helper";
import { V1ABI } from "./v1_abi";
import { NFTDescABI } from "./nft_descriptor_abi";
import * as imageDataURI from "image-data-uri";
import { writeFileSync } from "fs";

const ethProvider = {
  4: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161 ",
};

const decode = (str: string): string =>
  Buffer.from(str, "base64").toString("binary");
const encode = (str: string): string =>
  Buffer.from(str, "binary").toString("base64");

// get image datauri
export async function getDataURI(nft, chainId, tokenId) {
  const chain = ChainId[chainId];
  const v1addr = await getAddress(nft, chain);
  const nftdescaddr = await getAddress("NFTDescriptor", chain);
  const api = await ethersApi(chainId);

  const v1 = new Contract(v1addr, V1ABI, api);
  const nftDesc = new Contract(nftdescaddr, NFTDescABI, api);
  const svgPrev = await nftDesc.svgWithoutImages(tokenId);
  const metadataURI = await nftDesc.tokenURI(tokenId);
  // Decode metadata from descriptor
  const metadata = uriToJson(metadataURI);

  // Find images from it
  // background
  const bgData = await imgToDataURI(
    `./${nft}/backgrounds/${metadata.chainId}.png`
  );
  const bgSVG = await addBackgroundDefs(bgData);
  // network
  const netData = await imgToDataURI(
    `./${nft}/networks/${metadata.chainId}.png`
  );
  const netSVG = await addImage(netData, 285, 50, 60, 60);
  // collateral
  const cltData = await imgToDataURI(
    `./${nft}/tokens/${metadata.chainId}/${metadata.collateral}.png`
  );
  const cltSVG = await addImage(cltData, 269, 184, 40, 40);
  // debt
  const dbtData = await imgToDataURI(
    `./${nft}/tokens/${metadata.chainId}/${metadata.debt}.png`
  );
  const dbtSVG = await addImage(dbtData, 329, 184, 40, 40);
  // Add them together
  const bgNet = svgPrev.concat(bgSVG).concat(netSVG);
  const result = bgNet.concat(cltSVG).concat(dbtSVG).concat("</svg>");
  // Encode as svg uri and send response as server
  var base64 = require("base-64");
  var utf8 = require("utf8");
  const bytes = utf8.encode(result);
  const encoded = await svgToBase64(bytes);
  writeFileSync("./test.txt", encoded)
  return encoded;
}

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
  let provider = new ethers.providers.JsonRpcProvider(ethProvider[chainId]);
  let wallet = ethers.Wallet.fromMnemonic(
    "test test test test test test test test test test test junk"
  );
  let walletWithProvider = wallet.connect(provider);
  return walletWithProvider;
}

export async function imgToDataURI(path) {
  return await imageDataURI.encodeFromFile(path);
}

async function addImage(data, x, y, width, height) {
  const imgTest = `<image x="${x}" y="${y}" width="${width}" height="${height}" xlink:href="${data}" />`;
  return imgTest;
}
