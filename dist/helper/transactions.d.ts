import { ethers } from "ethers";
export declare function executeTx(tx: any, event: string): Promise<any>;
export declare function deployContract(deploy: ethers.Contract, contract: string): Promise<void>;
export declare function executeFrom(ethers: any, deployer: any, func: any): Promise<void>;
