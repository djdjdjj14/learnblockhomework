import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers'
import ERC20Token from './artifacts/contracts/Newerc20.sol/ERC20Token.json'
import Vault from './artifacts/contracts/Vault.sol/Vault.json'

// Update with the contract address logged out to the CLI when it was deployed 
const erc20addr = "0x5F30929Dd04A15D672C2cd1e8f143fBb674e5E55"
const vaultaddr = "0x59dDb630468eAB39138074389E00E7be67F58beC"

function App() {
  // store greeting in local state
  const [userAccount, setUserAccount] = useState()
  const [amount, setAmount] = useState()
  //const [greeting, setGreetingValue] = useState()

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      console.log({ account })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(erc20addr, ERC20Token.abi, signer)
      contract.balanceOf(account).then(data => {
        console.log("data: ", data.toString())
        document.getElementsByName("t1")[0].value = data;
      })
    }
  }

  async function mint() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(erc20addr, ERC20Token.abi, signer)
      contract.mint(userAccount, amount).then(data => console.log({ data }))
    }
  }

  async function approve() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(erc20addr, ERC20Token.abi, signer)
      contract.approve(vaultaddr, amount).then(data => console.log({ data }))
    }
  }

  async function deposit() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(vaultaddr, Vault.abi, signer)
      contract.deposit(userAccount, amount).then(data => console.log({ data }))
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={mint}>Mint money</button>
        <button onClick={approve}>Approve money</button>
        <button onClick={deposit}>Deposit money</button>
        <button onClick={getBalance}>Get Balance</button>
        <input onChange={e => setUserAccount(e.target.value)} placeholder="Mint/Transfer to Account" />
        <input onChange={e => setAmount(e.target.value)} placeholder="Mint/Transfer/Approve Amount" />
        balance now:<input type="text" size="20" name="t1"></input>
      </header>
      
    </div>
  );
}

export default App;
