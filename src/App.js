import React, { useState, useEffect } from "react";
import Web3 from "web3";
import contractABI from "./contractABI.json";
import "./App.css";

const contractAddress = "0x5A41Ee25035aA53e39dC2c9155ea8cDed8a6D87D"; // Replace with your deployed contract address

function App() {
  // eslint-disable-next-line no-unused-vars
  const [web3, setWeb3] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [accounts, setAccounts] = useState([]);
  const [account1, setAccount1] = useState("");
  const [account2, setAccount2] = useState("");
  const [balance1, setBalance1] = useState("0");
  const [balance2, setBalance2] = useState("0");
  const [tokenContract, setTokenContract] = useState(null);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    async function loadWeb3() {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setWeb3(web3Instance);

        const accounts = await web3Instance.eth.getAccounts();
        setAccounts(accounts);
        setAccount1(accounts[0]);
        setAccount2(accounts[1]);

        const contract = new web3Instance.eth.Contract(
          contractABI,
          contractAddress
        );
        setTokenContract(contract);
      } else {
        process.env.NODE_ENV !== "test" && alert("Please install MetaMask!");
      }
    }
    loadWeb3();
  }, []);

  useEffect(() => {
    async function loadBalances() {
      if (tokenContract && account1 && account2) {
        const balance1 = await tokenContract.methods.balanceOf(account1).call();
        const balance2 = await tokenContract.methods.balanceOf(account2).call();
        setBalance1(balance1.toString());
        setBalance2(balance2.toString());
      }
    }

    loadBalances(); // Load balances initially
    const interval = setInterval(loadBalances, 10000); // Load balances every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [tokenContract, account1, account2]);

  const transferTokens = async () => {
    if (tokenContract) {
      try {
        const sender = recipient === account1 ? account2 : account1;
        const tx = {
          from: sender,
          gas: 100000, // Estimate or set the gas limit
          gasPrice: web3.utils.toWei("10", "gwei"), // Set a gas price (adjust as needed)
        };

        await tokenContract.methods.transfer(recipient, amount).send(tx);

        const balance1 = await tokenContract.methods.balanceOf(account1).call();
        const balance2 = await tokenContract.methods
          .balanceOf(recipient)
          .call();
        setBalance1(balance1.toString());
        setBalance2(balance2.toString());
        // clear input fields
        setRecipient("");
        setAmount("");
      } catch (error) {
        console.error("Transaction Error:", error);
      }
    }
  };

  const initToken = async () => {
    if (tokenContract) {
      try {
        const owner = "0xD5b4416dc0C04536c40faaefE3b5A0A71f6b83a0";
        const tx = {
          from: owner,
          gas: 100000, // Estimate or set the gas limit
          gasPrice: web3.utils.toWei("10", "gwei"), // Set a gas price (adjust as needed)
        };

        await tokenContract.methods.transfer(account1, 15).send(tx);

        const balance1 = await tokenContract.methods.balanceOf(account1).call();
        const balance2 = await tokenContract.methods.balanceOf(account2).call();
        setBalance1(balance1.toString());
        setBalance2(balance2.toString());
      } catch (error) {
        console.error("Transaction Error:", error);
      }
    }
  };

  return (
    <div className="App">
      <h1>Token DApp</h1>
      <div className="account">
        <h2>Account 1</h2>
        <p>Address: {account1}</p>
        <p>Balance: {balance1} MTK</p>
      </div>
      <div className="account">
        <h2>Account 2</h2>
        <p>Address: {account2}</p>
        <p>Balance: {balance2} MTK</p>
      </div>
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Recipient Address"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button onClick={transferTokens}>Transfer</button>
      {/* init token button */}
      <button onClick={initToken}>Init Token</button>
    </div>
  );
}

export default App;
