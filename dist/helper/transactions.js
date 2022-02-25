"use strict";
/// executes txs without race conditions in production environment
/// example
/// const tx = await factory.connect(deployer).setFeeTo(deployer.address);
/// await executeTx(tx, "Execute setFeeTo at")
/// logs 
/// Executes setFeeTo at: 0xf81ded9ca5936a06f9a4ee53db8a568eb84ffd39095ff6dfe0ff5aa60bb98058
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeFrom = exports.deployContract = exports.executeTx = void 0;
const _1 = require(".");
/// Mining...
async function executeTx(tx, event) {
    console.log(`${event}: ${tx.hash}`);
    console.log("Mining...");
    return await tx.wait();
}
exports.executeTx = executeTx;
/// deploys a contract without race conditions in production environment
/// example
/// console.log(`Deploying Standard AMM router with the account: ${deployer.address}`);  
/// const Router = await ethers.getContractFactory("UniswapV2Router02");
/// const router = await Router.deploy(factory.address, weth);
/// await deployContract(router, "UniswapV2Router02")
/// logs 
/// UniswapV2Router02 address: 0x4633C1F0F633Cc42FD0Ba394762283606C88ae52
/// Mining...
async function deployContract(deploy, contract) {
    const chainId = (await deploy.provider.getNetwork()).chainId;
    // Get network from chain ID
    let chain = _1.ChainId[chainId];
    console.log(`${contract} address at Chain Id of ${chain}:`, deploy.address);
    console.log(`Mining at ${deploy.hash}...`);
    await deploy.deployed();
    await (0, _1.recordAddress)(contract, chain, deploy.address);
}
exports.deployContract = deployContract;
async function executeFrom(ethers, deployer, func) {
    // Get before state
    console.log(`Deployer balance: ${ethers.utils.formatEther(await deployer.getBalance())} ETH`);
    await func();
    // Get results
    console.log(`Deployer balance: ${ethers.utils.formatEther(await deployer.getBalance())} ETH`);
}
exports.executeFrom = executeFrom;
