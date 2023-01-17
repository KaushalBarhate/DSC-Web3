import logo from "./logo.svg";
import "./App.css";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
const abi = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "claim",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "flipSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_uri", type: "string" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "price",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "saleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "baseURI", type: "string" }],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "tokenURIs",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [account, setAccount] = useState(null);
  const [uri, seturi] = useState(null);
  const [tokenid, settokenid] = useState(null);
  const [balance, setBalance] = useState(null);

  const connectHandler = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum,
          "any"
        );
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);

        console.log(accounts);
      } catch (err) {
        console.error(err);
        setErrorMessage("There was a problem connecting to MetaMask");
      }
    } else {
      setErrorMessage("Install MetaMask");
      alert("Install MetaMask");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", accountsChanged);
    }
  }, []);
  const accountsChanged = async (newAccount) => {
    if (newAccount.length == 0) {
      setAccount(null);
      return;
    }

    setAccount(newAccount[0]);
  };

  async function mint() {
    if (account != null && typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );

      const contractAddress = "0x0b57360cDC0494dc7cBD3A47393207a70D5Cb594";
      const contract = new ethers.Contract(
        contractAddress,
        abi,
        provider.getSigner()
      );
      const options = { value: ethers.utils.parseEther("0.02") };
      await contract.mint(uri, tokenid, options).then((res4) => {
        alert("minted");
      });
    }
  }
  async function totalsupply() {
    if (account != null && typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      const contractAddress = "0x0b57360cDC0494dc7cBD3A47393207a70D5Cb594";
      const contract = new ethers.Contract(
        contractAddress,
        abi,
        provider.getSigner()
      );
      const options = { value: ethers.utils.parseEther("0.02") };

      await contract.totalSupply().then(async (rest, err) => {
        alert(rest);
      });
    }
  }
  return (
    <div className="App">
      <>
        <p>Make sure you are on Goerli testnet</p>
        <br></br>
        <a href="https://goerlifaucet.com/" target="_blank">
          {" "}
          To Get goerli Test Eth
        </a>
        <br></br>
        <button
          marginTop={"15px"}
          marginRight={"20px"}
          id="connectmetamask"
          style={{
            float: "right",
            backgroundColor: "white",
            color: "black",
            display: "none",
          }}
          onClick={connectHandler}
        ></button>
        {account ? (
          <>
            <button
              marginTop={"15px"}
              marginRight={"20px"}
              id="metamaskhidesignout"
              style={{
                float: "right",
                backgroundColor: "white",
                color: "black",
              }}
              onClick={connectHandler}
            >
              {account.slice(0, 5) + "..." + account.slice(-4)}
            </button>
          </>
        ) : (
          //  null
          <button
            marginTop={"10px"}
            style={{ float: "right", backgroundColor: "white", color: "black" }}
            onClick={connectHandler}
          >
            Connect Account
          </button>
        )}
      </>
      <br></br>
      <input
        type="text"
        placeholder="uri"
        onChange={(e) => seturi(e.target.value)}
      />
      <br></br>
      <input
        type="text"
        placeholder="tokenid"
        onChange={(e) => settokenid(e.target.value)}
      />
      <br></br>
      <button onClick={mint}>Mint</button>
      <br></br>
      <button onClick={totalsupply}>get total supply</button>
    </div>
  );
}

export default App;
