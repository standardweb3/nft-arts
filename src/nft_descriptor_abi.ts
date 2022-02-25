export const NFTDescABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "constructor_",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "chainId",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "chainName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "collateral",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "debt",
              "type": "string"
            }
          ],
          "internalType": "struct NFTSVG.ChainParams",
          "name": "cParams",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "vault",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "cBlStr",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "dBlStr",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "symbol",
              "type": "string"
            }
          ],
          "internalType": "struct NFTSVG.BlParams",
          "name": "blParams",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "HP",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "HPBarColor1",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "HPBarColor2",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "HPStatus",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "HPGauge",
              "type": "string"
            }
          ],
          "internalType": "struct NFTSVG.HealthParams",
          "name": "hParams",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "MCR",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "LFR",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "SFR",
              "type": "string"
            }
          ],
          "internalType": "struct NFTSVG.CltParams",
          "name": "cltParams",
          "type": "tuple"
        }
      ],
      "name": "svgToImageURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "imageURI",
          "type": "string"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId_",
          "type": "uint256"
        }
      ],
      "name": "svgWithoutImages",
      "outputs": [
        {
          "internalType": "string",
          "name": "svg",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]