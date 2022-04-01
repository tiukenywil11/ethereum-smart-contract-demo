import './App.css';
import { useState, useEffect } from 'react'
// import web 3 functions, connected to ethereum
import Web3 from './components/config/web3'
// import smart contract local instance
import lottery from './components/smart-contract/lottery'

function App() {

  const [manager, setManager] = useState('');

  /* temporarily commented out web3GetAccounts function call
  const web3GetAccounts = async () => {
    const web3Accounts = await Web3.eth.getAccounts();
    console.log(web3Accounts);
    
  }

  web3GetAccounts(); 
  */
   
  useEffect(() => 
    {
      const fetchManager = async () => {
        // lottery manager call does not need an account argument, bevause it makes use of the default metamask account
        const manager = await lottery.methods.manager().call();
        // set state to manager
        setManager(manager);
      }

      // call function to set async manager
      fetchManager();
    },
    []
  ) 
  
  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>This contract is managed by {manager}</p>
    </div>
  );
}

export default App;
