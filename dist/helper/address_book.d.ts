import "dotenv/config";
export declare function getAddress(contract: any, chain: any): Promise<any>;
export declare function recordAddress(name: any, chain: any, address: any): Promise<boolean>;
export declare function loadAddresses(): Promise<any>;
export declare function validateDeploymentInfo(deployInfo: any): void;
export declare function fileExists(path: any): Promise<boolean>;
export declare function contractExists(content: any, name: any, chain: any, address: any): boolean;
export declare function confirmOverwrite(filename: any, name: any, chain: any, address: any): Promise<any>;
