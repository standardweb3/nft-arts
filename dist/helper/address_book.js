"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmOverwrite = exports.contractExists = exports.fileExists = exports.validateDeploymentInfo = exports.loadAddresses = exports.recordAddress = exports.getAddress = void 0;
/// Exporting directly due to function build error
const promises_1 = __importDefault(require("fs/promises"));
const inquirer_1 = __importDefault(require("inquirer"));
require("dotenv/config");
async function getAddress(contract, chain) {
    const filename = 'test-book.json';
    const exists = await fileExists(filename);
    if (exists) {
        var content = await loadAddresses();
        return content[contract][chain];
    }
    else {
        throw new Error("Contract not registered in address_book.json");
    }
}
exports.getAddress = getAddress;
async function recordAddress(name, chain, address) {
    const filename = 'test-book.json';
    const exists = await fileExists(filename);
    if (exists) {
        // find out whether info is already written
        var content = await loadAddresses();
        if (contractExists(content, name, chain, address)) {
            const overwrite = await confirmOverwrite(filename, name, chain, content[name][chain]);
            if (!overwrite) {
                return false;
            }
            else {
                content[name][chain] = address;
            }
        }
        else {
            if (!(name in content)) {
                content[name] = {};
            }
            content[name][chain] = address;
        }
    }
    else {
        console.log(`Writing deployment info to ${filename}`);
        content = {};
        content[name] = {};
        content[name][chain] = address;
    }
    const json = JSON.stringify(content, null, 2);
    await promises_1.default.writeFile(filename, json, { encoding: 'utf-8' });
    return true;
}
exports.recordAddress = recordAddress;
async function loadAddresses() {
    let deploymentConfigFile = process.env.ADDRESS_BOOK;
    if (!deploymentConfigFile) {
        console.log('no deploymentConfigFile field found in standard deployment config. attempting to read from default path "./test-book.json"');
        deploymentConfigFile = 'test-book.json';
    }
    const content = await promises_1.default.readFile(deploymentConfigFile, { encoding: 'utf8' });
    const deployInfo = JSON.parse(content);
    try {
        validateDeploymentInfo(deployInfo);
    }
    catch (err) {
        throw new Error(`error reading deploy info from ${deploymentConfigFile}: ${err}`);
    }
    return deployInfo;
}
exports.loadAddresses = loadAddresses;
function validateDeploymentInfo(deployInfo) {
    if (Object.keys(deployInfo).length == 0) {
        throw new Error('loaded address book has no contract info registered');
    }
    const chainRequired = arg => {
        if (!deployInfo.name.hasOwnProperty(arg)) {
            throw new Error(`required field "contractName.${arg}" not found`);
        }
    };
    //chainRequired('chain')
}
exports.validateDeploymentInfo = validateDeploymentInfo;
async function fileExists(path) {
    try {
        await promises_1.default.access(path);
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.fileExists = fileExists;
function contractExists(content, name, chain, address) {
    try {
        return content[name] !== undefined && content[name][chain] !== undefined && content[name][chain] !== address;
    }
    catch (e) {
        return false;
    }
}
exports.contractExists = contractExists;
async function confirmOverwrite(filename, name, chain, address) {
    const answers = await inquirer_1.default.prompt([
        {
            type: 'confirm',
            name: 'overwrite',
            message: `File ${filename} exists and there is same contract ${name} on ${chain} at ${address}. Overwrite it? (file will be overwritten as default)`,
            default: true,
        }
    ]);
    return answers.overwrite;
}
exports.confirmOverwrite = confirmOverwrite;
