import logo from './logo.svg';
import './App.css';
import Web3 from './components/config/web3'

function App() {

  const web3GetAccounts = async () => {
    const web3Accounts = await Web3.eth.getAccounts();
    /* this is for testing only
    console.log(web3Accounts);
    */
  }

  /*  temporarily commented out web3GetAccounts function call
  web3GetAccounts(); 
  */
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
